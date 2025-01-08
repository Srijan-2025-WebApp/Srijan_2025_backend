import mongoose from "mongoose"

const EventTeamListSchema = new mongoose.Schema({
  EventName: {
    type: String,
    required: true,
  },
  Teams: [
    {
      MembersList: [
        {
          Name: {
            type: String,
            required: true,
          },
          Email: {
            type: String,
            required: true,
          },
          PhoneNumber: {
            type: String,
            required: true,
          },
          College: {
            type: String,
            required: true,
          },
          Instrument: {
            type: String,
            default: null,
          },
        },
      ],
      TeamName: {
        type: String,
        default: null,
        required: true
      },
      IsSponsor: {
        type: Boolean,
        default: false,
      },
      Audio: {
        type: String,
        default: null,
      },
      Accompanist: {
        type: String,
        default: null,
      },
      ReferralID:{
        type: String,
        default:null,
      },
      Genre:{
        type:[String],
        default:null
      },
      Round1Preference:{
        type:String,
        default:null
      },
      ageProof:{
        type:String,
        default:null
      }
    },
  ],
},{timestamps: true});

export const EventData = mongoose.model(
  "EventsData",
  EventTeamListSchema
);
