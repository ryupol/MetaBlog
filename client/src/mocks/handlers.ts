import { http, HttpResponse } from "msw";

export const handlers = [
  // All blogs
  http.get("/api/blogs", () => {
    return HttpResponse.json({
      data: [
        {
          blog_id: 1,
          title: "The Impact of Technology",
          image_url: "https://example.com/blog1.png",
          tag: "Technology",
          content: "<h3>Travel</h3> <p>Traveling is an bra bra</p><br>",
          created_at: "2024-09-15T15:20:12.001Z",
          updated_at: "2024-10-10T23:49:09.021Z",
          user_id: 1,
          name: "Jason Franciso",
          profile_url: "https://example.com/jason_franciso.png",
        },
        {
          blog_id: 2,
          title: "Grid system for better Design User Interface",
          image_url: "https://example.com/blog2.png",
          tag: "Technology",
          content: "<p>The grid system...</p>",
          created_at: "2023-10-05T12:25:29.121Z",
          updated_at: "2023-11-01T10:35:19.041Z",
          user_id: 3,
          name: "Elizabeth Slavin",
          profile_url: "https://example.com/tracey_wilson.png",
        },
        {
          blog_id: 3,
          title: "How does the environment you lived in affect your life?",
          image_url: "https://example.com/blog3.png",
          tag: "Lifestyle",
          content: "<p>Your environment plays a pivotal role</p>",
          created_at: "2024-02-28T09:49:09.031Z",
          updated_at: "2024-03-15T11:00:09.011Z",
          user_id: 2,
          name: "Tracey Wilson",
          profile_url: "https://example.com/elizabeth_slavin.png",
        },
        {
          blog_id: 4,
          title: "Podcast: Creating a better CX Community",
          image_url: "https://example.com/blog4.png",
          tag: "Business",
          content: "<p>Customer Experience <b>(CX)</b> content.... </p>",
          created_at: "2021-11-20T17:49:19.041Z",
          updated_at: "2024-08-19T19:59:09.041Z",
          user_id: 2,
          name: "Tracey Wilson",
          profile_url: "https://example.com/elizabeth_slavin.png",
        },
        {
          blog_id: 5,
          title: "When money has a price",
          image_url: "https://example.com/blog5.png",
          tag: "Economy",
          content: "<b>The rising cost of capital in America</b>",
          created_at: "2024-08-21T14:49:09.001Z",
          updated_at: "2024-10-05T18:15:19.021Z",
          user_id: 5,
          name: "Eric Smith",
          profile_url: "https://example.com/ernie_smith.png",
        },
      ],
    });
  }),

  // All users
];
