import {User} from "../models/user.model.js"
import {HttpError} from "../utils/HttpError.js"
import {EventData} from "../models/eventRegistration.model.js"
import {ApiResponse} from "../utils/ApiResponse.js"

export const handleEventRegistration = async(req,res) =>{
    const {EventName,MembersList,TeamName,...others} = req.body;

    const validationRules = [
        { field: 'EventName', value: EventName, message: 'EventName is Required' },
        { field: 'MembersList', value: MembersList, message: 'Please Attach Members List' },
        { field: 'TeamName', value: TeamName, message: 'Team Name is required'}
      ];
  
    for(const rule of validationRules){
        if(!rule.value){
            return res.status(400).json(new HttpError(rule.message, 400));
        }
    }
    const currentTeamEmails = [];
    
    for(const user of MembersList){
        const isExisitingUser = await User.findOne({Email: user?.Email.toLowerCase()});
        if(!isExisitingUser) return res.status(404).json(new HttpError(`${user?.Email} has not registered!! Please Sign in`,404));
        currentTeamEmails.push(user?.Email);
    }

    const allEmails = await EventData.aggregate([
        {
          $match: {
            EventName: EventName
          }
        },
        {
          $unwind: "$Teams"
        },
        {
          $unwind: "$Teams.MembersList"
        },
        {
          $group: {
            _id: null,
            emails: {
              $addToSet: "$Teams.MembersList.Email"
            }
          }
        },
        {
          $project: {
            _id: 0,
            emails: 1
          }
        }
      ]
      )

      const emails = allEmails[0]?.emails || [];
      console.log(currentTeamEmails);

      for(const email of emails){
        for(const teamMemberMail of currentTeamEmails){
            if(email.toLowerCase() === teamMemberMail.toLowerCase()){
                return res.status(400).json(new HttpError(`${teamMemberMail} is already registered for ${EventName}`,400));
            }
        }
      }

      const Event =  await EventData.findOne({EventName: EventName});
      
      try {
        if(Event){
            await EventData.updateOne({EventName: EventName},{
                $push: {Teams: {MembersList, TeamName, ...others}}
            });
            return res.status(200).json(new ApiResponse('Team registered Successfully', true))
        }
        else{
            const newEvent = new EventData({EventName: EventName,Teams: [{MembersList, TeamName, ...others}]});
            await newEvent.save();
            return res.status(200).json(new ApiResponse('Team registered Successfully', true))
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json(new HttpError('Internal Server Error',500));
      }
}