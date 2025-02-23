import { defaultLexical } from "@/fields/defaultLexical"
import { slugField } from "@/fields/slug"
import type { CollectionConfig } from "payload"
import { anyone } from "../../access/anyone"
import { authenticated } from "../../access/authenticated"
import { revalidateDelete, revalidateTour } from "./hooks/revalidateTour"

export const Tours: CollectionConfig = {
  slug: "tours",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "duration", "price"],
  },
  hooks: {
    afterChange: [revalidateTour],
    afterDelete: [revalidateDelete],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    ...slugField(),
    {
      name: "startLocation",
      type: "text",
      required: true,
      admin: {
        description: "Starting city/location of the tour",
      },
    },
    {
      name: "endLocation",
      type: "text",
      required: true,
      admin: {
        description: "Ending city/location of the tour",
      },
    },
    {
      name: "startAirport",
      type: "text",
      required: true,
      admin: {
        description: "Nearest airport to start location (with code)",
      },
    },
    {
      name: "endAirport",
      type: "text",
      required: true,
      admin: {
        description: "Nearest airport to end location (with code)",
      },
    },
    {
      name: "totalDistance",
      type: "group",
      fields: [
        {
          name: "min",
          type: "number",
          required: true,
          admin: {
            description: "Minimum total distance in kilometers",
          },
        },
        {
          name: "max",
          type: "number",
          required: true,
          admin: {
            description: "Maximum total distance in kilometers",
          },
        },
      ],
    },
    {
      name: "dailyDistance",
      type: "group",
      fields: [
        {
          name: "min",
          type: "number",
          required: true,
          admin: {
            description: "Minimum daily distance in kilometers",
          },
        },
        {
          name: "max",
          type: "number",
          required: true,
          admin: {
            description: "Maximum daily distance in kilometers",
          },
        },
      ],
    },
    {
      name: "difficulty",
      type: "number",
      required: true,
      min: 1,
      max: 5,
      admin: {
        description: "Difficulty rating from 1 (easiest) to 5 (most difficult)",
      },
    },
    {
      name: "travelTimeRating",
      type: "number",
      required: true,
      min: 1,
      max: 5,
      admin: {
        description: "Travel time intensity from 1 (short daily rides) to 5 (long daily rides)",
      },
    },
    {
      name: "sightseeing",
      type: "number",
      required: true,
      min: 1,
      max: 5,
      admin: {
        description: "Sightseeing opportunities from 1 (limited) to 5 (extensive)",
      },
    },
    {
      name: "minimumParticipants",
      type: "number",
      required: true,
      min: 1,
      admin: {
        description: "Minimum number of participants required for the tour",
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "shortDescription",
      type: "textarea",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
      required: true,
      admin: {
        description: "Subtitle for the tour",
      },
    },
    {
      name: "fullDescription",
      type: "richText",
      required: true,
      editor: defaultLexical,
    },
    {
      name: "duration",
      type: "number",
      required: true,
      min: 1,
      admin: {
        description: "Duration in days",
      },
    },
    {
      name: "ridingDays",
      type: "number",
      required: true,
      min: 1,
      admin: {
        description: "Number of riding days",
      },
    },
    {
      name: "price",
      type: "number",
      required: true,
      min: 0,
      admin: {
        description: "Price in USD",
      },
    },
    {
      name: "included",
      type: "array",
      fields: [
        {
          name: "item",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "itinerary",
      type: "array",
      fields: [
        {
          name: "day",
          type: "number",
          required: true,
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "richText",
          editor: defaultLexical,
          required: true,
        },
        {
          name: "distance",
          type: "number",
          admin: {
            description: "Distance in kilometers",
          },
        },
      ],
    },
    {
      name: "additionalCosts",
      type: "array",
      fields: [
        {
          name: "item",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "tourBookLink",
      type: "text",
      admin: {
        description: "Link to download the tour book PDF",
      },
    },
    {
      name: "motorcycles",
      type: "array",
      fields: [
        {
          name: "model",
          type: "text",
          required: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "description",
          type: "textarea",
        },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Show this tour on the homepage",
      },
    },
  ],
}
