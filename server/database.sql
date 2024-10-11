CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    profile_url TEXT DEFAULT 'https://res.cloudinary.com/dxwmjflhh/image/upload/v1727805743/happy.jpg' NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blogs (
    blog_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    tag VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) 
);

-- Insert Users
INSERT INTO users (name, profile_url, email, password) VALUES
('Jason Franciso', 'https://res.cloudinary.com/dxwmjflhh/image/upload/v1727867310/jason_franciso.png', 'admin1@example.com', 'admin1'),
('Tracey Wilson', 'https://res.cloudinary.com/dxwmjflhh/image/upload/v1727867310/elizabeth_slavin.png', 'admin2@example.com', 'admin2'),
('Elizabeth Slavin', 'https://res.cloudinary.com/dxwmjflhh/image/upload/v1727867310/tracey_wilson.png', 'admin3@example.com', 'admin3'),
('Ernie Smith', 'https://res.cloudinary.com/dxwmjflhh/image/upload/v1727867310/eric_smith.png', 'admin4@example.com', 'admin4'),
('Eric Smith', 'https://res.cloudinary.com/dxwmjflhh/image/upload/v1727867310/ernie_smith.png', 'admin5@example.com', 'admin5');

-- Insert Blogs (2 blogs for each user)
INSERT INTO blogs (title, image_url, tag, content, user_id) VALUES
('The Impact of Technology on the Workplace: How Technology is Changing', 'https://res.cloudinary.com/dxwmjflhh/image/upload/v1728533736/blog1.png', 'Technology', 
'<h3>How To Travel The World</h3> <p>Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. However, traveling can also be stressful and overwhelming, especially if you don''t plan and prepare adequately. In this blog article, we''ll explore tips and tricks for a memorable journey and how to make the most of your travels.</p> <br> <p>One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect.</p> <br> <h3>Research Your Destination</h3> <p>Before embarking on your journey, take the time to research your destination. This includes understanding the local culture, customs, and laws, as well as identifying top attractions, restaurants, and accommodations. Doing so will help you navigate your destination with confidence and avoid any cultural faux pas.</p> <br> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hendrerit gravida rutrum quisque non tellus orci ac auctor. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Viverra adipiscing at in tellus.</p> <br> <h3>Plan Your Itinerary</h3> <p>While it''s essential to leave room for spontaneity and unexpected adventures, having a rough itinerary can help you make the most of your time and budget. Identify the must-see sights and experiences and prioritize them according to your interests and preferences. This will help you avoid overscheduling and ensure that you have time to relax and enjoy your journey.</p> <br> <p>Vitae sapien pellentesque habitant morbi tristique. Luctus venenatis lectus magna fringilla. Nec ullamcorper sit amet risus nullam eget felis. Tincidunt arcu non sodales neque sodales ut etiam sit amet.</p> <br> <blockquote> <p>“Traveling can expose you to new environments and potential health risks, so it''s crucial to take precautions to stay safe and healthy.”</p> </blockquote> <br> <h3>Pack Lightly and Smartly</h3> <p>Packing can be a daunting task, but with some careful planning and smart choices, you can pack light and efficiently. Start by making a packing list and sticking to it, focusing on versatile and comfortable clothing that can be mixed and matched. Invest in quality luggage and packing organizers to maximize space and minimize wrinkles.</p> <br> <h3>Stay Safe and Healthy</h3> <p>Traveling can expose you to new environments and potential health risks, so it''s crucial to take precautions to stay safe and healthy. This includes researching any required vaccinations or medications, staying hydrated, washing your hands frequently, and using sunscreen and insect repellent. It''s also essential to keep your valuables safe and secure and to be aware of your surroundings at all times.</p> <br> <h3>Immerse Yourself in the Local Culture</h3> <p>One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect.</p> <br> <h3>Capture Memories</h3> <p>Finally, don''t forget to capture memories of your journey. Whether it''s through photographs, journaling, or souvenirs, preserving the moments and experiences of your travels can bring joy and nostalgia for years to come. However, it''s also essential to be present in the moment and not let technology distract you from the beauty of your surroundings.</p> <br> <h3>Conclusion</h3> <p>Traveling is an art form that requires a blend of planning, preparation, and spontaneity. By following these tips and tricks, you can make the most of your journey and create memories that last a lifetime. So pack your bags, embrace the adventure, and enjoy the ride.</p> <br>',
1),

('Grid system for better Design User Interface', 'https://res.cloudinary.com/dxwmjflhh/image/upload/v1728534057/blog2.png', 'Technology', 
'<p>The grid system is a fundamental design principle that ensures alignment, consistency, and responsive behavior in user interfaces (UI). By creating a structured layout, designers can enhance usability and make their interfaces visually appealing and functional. In this post, we''ll explore how grid systems can transform your UI design.</p><br><h3>What is a Grid System?</h3><p>A grid system is essentially a framework of rows and columns that helps designers position and align elements on a page. It creates visual and structural balance, ensuring that the design is aesthetically pleasing while providing a cohesive experience across devices.</p><p>Most commonly, grids consist of equal-width columns separated by margins or gutters, which give the design some breathing room. This structure helps in organizing information in a way that''s easy to navigate and digest.</p><br><h3>Benefits of Using a Grid System</h3><ul><li><strong>Alignment:</strong> Grid systems help maintain the alignment of UI elements, ensuring consistency throughout the design.</li><li><strong>Responsiveness:</strong> A well-implemented grid adapts to different screen sizes, ensuring the interface looks good on desktops, tablets, and mobile devices.</li><li><strong>Efficiency:</strong> Grids allow designers to build faster by creating reusable structures and components, reducing the time spent on minor adjustments.</li></ul><br><h3>Types of Grid Systems</h3><p>There are several types of grid systems designers can use based on their project needs:</p><ul><li><strong>Column Grids:</strong> Most common in websites and apps, this grid type consists of vertical columns. Designers place content within these columns to create a balanced layout.</li><li><strong>Modular Grids:</strong> These grids are made of both horizontal and vertical lines, creating a matrix-like structure. Modular grids are great for more complex designs with lots of elements.</li><li><strong>Hierarchical Grids:</strong> This type is more fluid and used in less rigid designs. It adapts to the content rather than fitting the content into fixed columns or modules.</li></ul><br><h3>Conclusion: Mastering the Grid</h3><p>Mastering grid systems is a vital skill for any UI designer. By using grids effectively, you can ensure that your designs are consistent, responsive, and user-friendly, which ultimately enhances the user experience.</p><br>',
3),

('How does the environment you lived in affect your life?', 'https://res.cloudinary.com/dxwmjflhh/image/upload/v1728546127/blog3.png', 'Lifestyle', 
'<p>Your environment plays a pivotal role in shaping who you are, from your habits and personality to your mental and emotional well-being. The people, culture, and physical surroundings all contribute to your sense of self and worldview. In this post, we will explore how different aspects of your environment influence your life.</p><br><h3>Cultural and Social Influences</h3><p>The cultural and social environment in which you grow up can have a profound impact on your beliefs, values, and behaviors. For instance, someone raised in a collectivist society may prioritize community and family relationships, while someone from an individualistic society may value personal independence more.</p><p>Additionally, the social connections you form in your environment play a critical role in shaping your emotional health. A supportive community can foster personal growth and resilience, while social isolation may lead to anxiety, depression, or a lack of purpose.</p><br><h3>Physical Environment: Urban vs. Rural</h3><p>The physical environment, whether you live in a bustling city or a quiet rural area, significantly affects your quality of life. City dwellers often experience a faster pace of life with more career opportunities and cultural experiences, but they may also face higher levels of stress, pollution, and limited access to nature.</p><p>In contrast, people living in rural areas might benefit from a slower, more peaceful lifestyle with greater access to natural surroundings, but they may also face fewer career opportunities and social isolation.</p><br><h3>Environmental Impact on Mental Health</h3><p>Research has shown that your surroundings can have a profound effect on your mental health. Natural environments, for instance, are known to reduce stress, anxiety, and depression, while urban settings can sometimes increase mental fatigue and stress.</p><p>Making conscious changes in your environment—such as incorporating green spaces, reducing clutter, or moving to a place that aligns with your personal values—can improve your overall well-being.</p><br><h3>Conclusion</h3><p>The environment you live in affects your mindset, health, and future opportunities. Whether it''s your cultural background, social connections, or physical space, being mindful of your surroundings and how they impact you is key to living a balanced, fulfilled life.</p><br>', 
2),

('Podcast: Creating a better CX Community', 'https://res.cloudinary.com/dxwmjflhh/image/upload/v1728546140/blog4.png', 'Business', 
'<p>Customer Experience (CX) is becoming a critical factor in the success of any business. Creating a better CX community means building relationships with customers that go beyond transactions. In this blog, we discuss key strategies for fostering a vibrant CX community and ensuring long-term customer loyalty.</p><br><h3>The Importance of Customer Experience</h3><p>Customers today expect personalized experiences, immediate responses, and seamless interactions across multiple platforms. Businesses that excel at CX often outperform their competitors because they build deeper, more meaningful connections with their customers.</p><p>A good CX community can help businesses gather valuable feedback, test new ideas, and develop a sense of brand loyalty among their customer base.</p><br><h3>Strategies for Building a CX Community</h3><ul><li><strong>Active Listening:</strong> Actively engaging with customers on social media, forums, or via customer support channels ensures that their voices are heard and their concerns addressed promptly.</li><li><strong>Customer Feedback Loops:</strong> Continuously seek feedback through surveys, reviews, or direct conversations to understand customer needs and pain points.</li><li><strong>Community Engagement:</strong> Create spaces where customers can interact with one another, such as online forums, webinars, or community events, to foster a sense of belonging.</li></ul><br><h3>Conclusion: Growing Your CX Community</h3><p>Building a strong CX community is not a one-time effort but an ongoing process of engagement, feedback, and refinement. By focusing on the needs of your customers and building genuine relationships, you can create a community that supports your brand''s long-term success.</p><br>', 
2),

('When money has a price: How the higher cost of capital is affecting America''s real economy', 'https://res.cloudinary.com/dxwmjflhh/image/upload/v1728546153/blog5.png', 'Economy', 
'<p>The rising cost of capital in America is having far-reaching consequences for businesses, investors, and consumers. With interest rates on the rise, borrowing is more expensive, which can stifle economic growth and innovation. In this blog, we will explore how these higher costs are influencing the real economy.</p><br><h3>Impact on Businesses</h3><p>For businesses, higher interest rates mean borrowing money for expansion, research, and development has become more costly. This leads many companies to delay or scale down their growth plans. Smaller businesses and startups are hit particularly hard as they often rely on external funding for survival and expansion.</p><p><strong>Reduced Investments:</strong> As the cost of capital rises, businesses are less likely to invest in new technologies or enter new markets, which can stifle innovation and reduce their competitive edge.</p><br><h3>Impact on Consumers</h3><p>Consumers also feel the effects of a higher cost of capital, particularly in sectors like housing and automobiles. As interest rates on mortgages, car loans, and credit cards increase, consumer spending power decreases. Higher debt payments leave less disposable income for other goods and services, slowing overall economic activity.</p><br><h3>Impact on Investors</h3><p>Higher capital costs can make investors more risk-averse, particularly in sectors like technology and startups, where returns can be uncertain. Investors may seek safer, more stable investments such as bonds, which offer higher yields in a high-interest-rate environment.</p><br><h3>Conclusion: Navigating the High-Cost Capital Era</h3><p>In conclusion, the rising cost of capital is reshaping the American economy, slowing business expansion and reducing consumer spending. However, for businesses that can innovate and optimize operations, there is still opportunity. Those who can weather the storm and adjust their strategies will be better positioned for long-term success.</p><br>', 
5),

('How To Travel The World', 'https://res.cloudinary.com/dxwmjflhh/image/upload/v1728546165/blog6.png', 'Travel', 
'<p>Traveling the world is a dream for many, but with the right planning, budgeting, and mindset, it''s more achievable than you might think. In this blog, we''ll explore practical tips and strategies for turning your travel dreams into reality, whether you''re planning a short-term trip or long-term adventure.</p><br><h3>Set a Travel Budget</h3><p>The first step to making world travel a reality is to set a clear budget. Consider all your major expenses, including flights, accommodation, food, transportation, and activities. You can also look for budget-friendly travel hacks such as using travel rewards programs or booking in advance to save on flights and lodging.</p><p><strong>Budgeting Tips:</strong> Stay in hostels or Airbnb instead of hotels, use public transportation, and eat local street food instead of dining in expensive restaurants. These small savings can add up and help stretch your budget further.</p><br><h3>Travel Slowly</h3><p>Instead of trying to visit as many places as possible, focus on spending more time in fewer destinations. Traveling slowly allows you to experience a place more deeply, learn about the local culture, and make meaningful connections with people you meet along the way.</p><br><h3>Be Flexible with Your Plans</h3><p>While it''s essential to have a general itinerary, leaving room for flexibility can open up unexpected adventures and opportunities. Sometimes, the best experiences come from spontaneous decisions, like staying longer in a city you love or visiting a nearby destination that wasn''t on your original plan.</p><br><h3>Conclusion: The Journey of a Lifetime</h3><p>Traveling the world is an enriching experience that broadens your perspective and creates lifelong memories. With careful planning, smart budgeting, and a flexible mindset, you can make your travel dreams a reality and embark on the journey of a lifetime.</p><br>', 
4),

('The Winning Mindset: How Sports Psychology Transforms Athletic Performance', 'https://res.cloudinary.com/dxwmjflhh/image/upload/v1728546174/blog7.png', 'Sports', 
'<p>In the world of sports, physical training is essential, but mental training can be just as critical to an athlete''s success. Sports psychology helps athletes develop the mental toughness, focus, and confidence needed to excel. In this blog, we will explore how sports psychology can transform athletic performance.</p><br><h3>Visualization Techniques</h3><p>One of the most widely used sports psychology tools is visualization. Athletes mentally rehearse their performance, imagining themselves succeeding in their sport. Visualization helps build confidence, reduce anxiety, and prepare athletes for high-pressure situations by mentally simulating real-world scenarios.</p><p><strong>Example:</strong> Olympic athletes often visualize every moment of their performance, from start to finish, to ensure they''re mentally prepared for any challenges that arise during the competition.</p><br><h3>Mindfulness and Focus</h3><p>Mindfulness techniques, such as meditation and breathing exercises, help athletes stay focused on the present moment. In high-stakes situations, the ability to block out distractions and maintain mental clarity can be the difference between winning and losing.</p><p><strong>Benefits:</strong> By practicing mindfulness, athletes can stay calm under pressure, avoid overthinking, and perform at their best, even in challenging conditions.</p><br><h3>Emotional Regulation and Stress Management</h3><p>Athletes are often under immense pressure to perform, which can lead to stress and anxiety. Sports psychology teaches emotional regulation techniques that help athletes manage their emotions during competitions, preventing stress from negatively affecting their performance.</p><br><h3>Conclusion: Mastering the Mental Game</h3><p>Sports psychology is a powerful tool for athletes looking to take their performance to the next level. By mastering visualization, mindfulness, and emotional regulation, athletes can develop the mental resilience needed to succeed both on and off the field. The mind, just like the body, needs to be trained for peak performance.</p><br>', 
1),

('Innovative Strategies for Navigating a Disruptive Business Landscape in 2024', 'https://res.cloudinary.com/dxwmjflhh/image/upload/v1728546185/blog8.png', 'Business', 
'<p>In 2024, businesses are facing unprecedented levels of disruption due to rapid technological advancements, economic shifts, and changing consumer behavior. To stay competitive in this environment, companies must adopt innovative strategies that allow them to adapt and thrive. In this blog, we''ll discuss key strategies for navigating this disruptive landscape.</p><br><h3>Embrace Digital Transformation</h3><p>Digital transformation is no longer an option—it''s a necessity. Businesses need to leverage emerging technologies like artificial intelligence (AI), machine learning, and automation to streamline operations, improve efficiency, and deliver better customer experiences.</p><p><strong>Key Steps:</strong> Companies should invest in digital infrastructure, adopt cloud computing solutions, and embrace data analytics to make informed business decisions and stay agile in a fast-paced environment.</p><br><h3>Prioritize Sustainability</h3><p>With increasing environmental awareness, consumers are now expecting businesses to prioritize sustainability. Companies that embrace eco-friendly practices, reduce their carbon footprint, and adopt sustainable sourcing strategies will gain a competitive edge in 2024 and beyond.</p><p><strong>Benefits:</strong> Sustainable businesses often enjoy greater customer loyalty, cost savings from energy efficiency, and positive brand reputation, positioning them well for long-term success.</p><br><h3>Focus on Talent Retention</h3><p>The labor market remains competitive, and retaining top talent is a major challenge for businesses in 2024. Companies that offer flexible working conditions, invest in employee development, and prioritize workplace culture will be better positioned to attract and retain the best employees.</p><br><h3>Conclusion: Adapting for Success</h3><p>In conclusion, navigating the disruptive business landscape of 2024 requires companies to embrace innovation, digital transformation, and sustainability. By staying agile and focusing on talent retention, businesses can not only survive but thrive in this rapidly evolving environment.</p><br>', 
3),

('Mastering Work-Life Balance: Daily Habits for a Healthier, Happier You', 'https://res.cloudinary.com/dxwmjflhh/image/upload/v1728546196/blog9.png', 'Lifestyle', 
'<p>In today''s fast-paced world, maintaining a healthy work-life balance is more important than ever. Balancing the demands of work, family, and personal life can be challenging, but with the right daily habits, it''s possible to achieve greater harmony and improve your well-being. In this blog, we''ll explore practical tips for mastering work-life balance.</p><br><h3>Set Clear Boundaries</h3><p>Setting clear boundaries between work and personal life is essential for achieving balance. Establish specific work hours and avoid checking emails or doing work tasks during personal time. This separation helps you stay focused during work hours and fully present during personal time.</p><p><strong>Tip:</strong> Use a dedicated workspace at home to create a mental and physical boundary between your work and personal life.</p><br><h3>Prioritize Self-Care</h3><p>Self-care isn''t a luxury; it''s a necessity. Regular exercise, sufficient sleep, and healthy eating are crucial for maintaining your physical and mental health. Taking time for yourself can help reduce stress and increase your productivity, making it easier to balance work and life.</p><p><strong>Tip:</strong> Incorporate mindfulness practices like meditation or yoga into your daily routine to help reduce stress and improve focus.</p><br><h3>Practice Effective Time Management</h3><p>Time management is key to balancing work and life effectively. Use tools like to-do lists, time-blocking, or digital calendars to organize your day and prioritize tasks. By managing your time effectively, you can accomplish more during work hours and free up time for personal activities.</p><br><h3>Conclusion: Creating a Balanced Life</h3><p>Achieving a healthy work-life balance requires conscious effort and daily practice. By setting boundaries, prioritizing self-care, and managing your time effectively, you can create a life that supports both your personal well-being and professional success. Remember, balance isn''t about perfection—it''s about making time for what matters most.</p><br>', 
5),

('From Hidden Gems to Hotspots: Must-Visit Travel Destinations for 2024', 'https://res.cloudinary.com/dxwmjflhh/image/upload/v1728546206/blog10.png', 'Travel', 
'<p>With 2024 fast approaching, travelers are already planning their next great adventure. Whether you''re looking for undiscovered gems or popular hotspots, there are countless destinations waiting to be explored. In this blog, we''ll highlight some must-visit travel destinations for 2024 that offer unique experiences for every kind of traveler.</p><br><h3>Kyoto, Japan</h3><p>Known for its stunning temples, traditional tea houses, and beautiful gardens, Kyoto is a blend of ancient culture and modern life. Visitors can immerse themselves in Japanese history and traditions, making it an ideal destination for those looking to experience the heart of Japan.</p><p><strong>Must-Do:</strong> Don''t miss the famous Fushimi Inari Shrine and its thousands of red torii gates, or the serene Arashiyama Bamboo Grove for an unforgettable cultural experience.</p><br><h3>Faroe Islands</h3><p>For nature lovers and adventure seekers, the Faroe Islands offer dramatic landscapes of cliffs, fjords, and waterfalls. This hidden gem is perfect for hiking, birdwatching, and immersing yourself in pristine natural beauty.</p><p><strong>Must-Do:</strong> Visit the iconic Mulafossur Waterfall, hike the rugged trails of Kalsoy Island, and take in the breathtaking coastal views.</p><br><h3>Cape Town, South Africa</h3><p>Cape Town is a city that offers something for everyone—from the vibrant cultural scene to the breathtaking views of Table Mountain. With its beautiful beaches, exciting nightlife, and rich history, Cape Town is an ideal destination for those looking for a mix of adventure and relaxation.</p><p><strong>Must-Do:</strong> Take a cable car ride up Table Mountain, explore the colorful Bo-Kaap neighborhood, and enjoy the vibrant V&A Waterfront.</p><br><h3>Conclusion: Start Planning Your 2024 Adventure</h3><p>Whether you''re drawn to the rich history of Kyoto, the untouched beauty of the Faroe Islands, or the excitement of Cape Town, 2024 offers an array of must-visit destinations. Start planning your adventure now and get ready to explore these incredible places.</p><br>', 
4);