import Navbar from "../components/navbar";
import Tag from "../components/ui/tag";
import Profile from "../components/ui/profile";
import Footer from "../components/footer";
import { BlogPageSkeleton } from "../components/ui/skeleton";

function Blog() {
  const data = {
    title:
      "The Impact of Technology on the Workplace: How Technology is Changing",
    image: "https://picsum.photos/600/800",
    profile: "https://picsum.photos/200/200",
    name: "Tracey Wilson",
    content: `<p>Something's enriching, important, even a bit spiritual happens when we take time to disconnect from the demands of daily life and immerse ourselves in a new place. It is during these escapes that we discover the world's hidden gems, broadening our understanding of different cultures, traditions, and lifestyles.</p><p><br></p><p>One of the most rewarding aspects of traveling is connecting with the locals. Their warmth, welcoming smiles, and storytelling often reveal hidden treasures, enhancing the destination's charm ten-fold.</p><p><br></p><p><br></p><h3>Embrace the Unknown</h3><p><br></p><p>Dare to step outside your comfort zone, for travel thrives on spontaneity. The best memories are often unscripted, born from unexpected detours and unplanned encounters. Let go of itineraries, surrender to the rhythm of the place, and allow yourself to be surprised by its unique offerings.</p><p><br></p><p><br></p><h3>Plan Your Itinerary</h3><p><br></p><p>While spontaneity has its merits, a carefully crafted itinerary sets the stage for a smooth and enjoyable journey. Research your desired destination, outline key attractions, and factor in travel time between locations. This strategic approach ensures you make the most of your valuable time while still leaving room for spontaneous adventures.</p><blockquote>"Traveling is a state of mind. It has to do with curiosity and courage. It is about leaving your comfort zone to meet the unknown and unfamiliar." - Christina Tan</blockquote><p><br></p><p><br></p><h3>Pack Light and Smartly</h3><p><br></p><p>Prioritize essentials, favoring versatile clothing for efficiency and space-saving. Remember, experiences outweigh material possessions. Embrace minimalism and revel in the freedom it brings.</p><p><br></p><p><br></p><h3>Stay Safe and Healthy</h3><p><br></p><p>Research your destination's health and safety guidelines, adhere to local regulations, and exercise caution in unfamiliar territories. This ensures a secure and enjoyable travel experience.</p><p><br></p><p><br></p><h3>Immerse Yourself in the Local Culture</h3><p><br></p><p>Engage with locals, respect their customs, and participate in cultural activities. This enriches your journey and fosters a deeper appreciation for the destination's unique heritage.</p><p><br></p><p><br></p><h3>Capture Memories</h3><p><br></p><p>Keep a journal, take photos, and collect mementos. These tangible reminders serve as a time capsule, allowing you to revisit and relive your travel experiences for years to come.</p><p><br></p><p><br></p><h3>Travel for the Exchange of Economic Benefits</h3><p><br></p><p>Tourism plays a crucial role in bolstering local economies. When we travel, we contribute to the livelihoods of communities, supporting businesses and individuals who rely on the tourism industry for sustenance.</p><p><br></p><p><br></p><h3>Cultivate Open-Mindedness</h3><p>Travel fosters a broader perspective on life. Embrace the diversity of cultures and belief systems you encounter. This open-mindedness cultivates tolerance and empathy, enriching both your personal growth and your interactions with others.</p><p><br></p><p><br></p><p>You can plan safe.</p>`,
    date: "May 20, 2022",
  };

  return (
    <main className="theme-base">
      <Navbar />
      <section className="max-container-blog py-12">
        <Tag cat="Technology" header={true} />
        <h1 className="mt-4 text-2xl font-bold">{data.title}</h1>
        <div className="text-slate-gray my-4 flex flex-1 items-center gap-3 text-xs">
          <Profile src={data.profile} className="h-9 w-9" />
          <span className="line-clamp-2 max-w-[120px] font-semibold">
            {data.name}
          </span>
          <span className="whitespace-wrap pl-4">{data.date}</span>
        </div>
        <div className="overflow-hidden rounded-[6px]">
          <img
            src={data.image}
            alt="Blog Image"
            className="aspect-video w-[100%] object-cover"
          />
        </div>
        <div className="content my-10">
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default Blog;
