import Image from "next/image";
import banner_desktop from "@/assets/akii_bua-desktop.jpg";
import banner_mobile from "@/assets/show-photo-icon-mobile.jpg";

const IntroductionSection = () => {


    return <div
        className='bg-gradient-to-b from-accent text-accent-foreground flex flex-col items-center justify-center p-5 w-full'>
        <div className=' grid sm:grid-cols-2 gap-2 md:gap-5 max-w-7xl justify-center items-center'>
            <Image src={banner_desktop}
                   className="hidden rounded-2xl md:block w-auto h-full object-cover"
                   alt="Image of John Akii Bua"
            />
            <Image
                src={banner_mobile}
                className="block rounded md:hidden object-cover  w-screen h-auto"
                alt="Image of John Akii Bua"
            />
            <div
                className='items-center justify-center flex flex-col md:flex-row xl:flex-col gap-4 bg-gray-700 text-gray-50  border p-4 px-6 rounded'>
                <span className='text-7xl'>911</span>
                <span
                    className='max-w-prose px-6'>
    {"John Akii Bua, a legendary athlete and Uganda's first gold medalist, deserves an enduring tribute—a stadium that echoes the pride of the Lango community to which he belonged. The proposed \"Akii Bua Stadium\" is not just a structure of bricks and mortar; it's a symbol of resilience, inspiration, and a testament to the extraordinary achievements of one of our own. "}
</span>
            </div>
        </div>
        <div className='flex flex-col gap-5 mt-20'>
            <div className='text-center  text-5xl text-primary dark:text-accent-foreground  font-black w-auto p-5'>
                IMPORTANCE
            </div>
            <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-3'>
                {
                    importance.map((item, index) => (
                        <div key={index}
                             className='flex flex-col sm:flex-row md:flex-col border bg-background rounded  h-auto'>
                            <div>
                                {
                                    item.image &&
                                    <Image
                                        src={item.image}
                                        alt={item.desc}
                                        width={600}
                                        height={600}
                                        className='h-60 md:w-screen w-[600] object-cover'
                                    />
                                }
                            </div>
                            <div className='flex gap-4 xl:gap-2  flex-col py-6 px-6 xl:py-4 xl:px-4'>
                                <span
                                    className='font-bold text-2xl text-center md:text-left  xl:text-center'>{`${item.title.toUpperCase()}`}</span>
                                <p className='max-w-prose'>{item.importance}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
}
export default IntroductionSection

const importance: { importance: string, image: string, desc: string, title: string }[] = [
    {
        title: 'Road Infrastructure',
        image: 'https://firebasestorage.googleapis.com/v0/b/luo-app-d2356.appspot.com/o/road_construction.webp?alt=media&token=e8d81996-7834-4708-86d2-328871b09602',
        desc: 'An artist\'s rendering or a map showcasing the proposed road improvements',
        importance: ' "The Akii Bua Stadium is not just a sports arena; it\'s a catalyst for development. Its construction will pave the way for improved road infrastructure in the Lango community, connecting towns and fostering economic growth."'
    },
    {
        title: 'Economic Impact',
        image: 'https://firebasestorage.googleapis.com/v0/b/luo-app-d2356.appspot.com/o/local_businesses.jpg?alt=media&token=04866967-a3d6-4e48-ad65-d18c22138135',
        desc: 'Collage of job creation, construction scenes, and local businesses.',
        importance: ' "Beyond the game, the stadium will be a hub for economic activities. The construction phase alone will generate jobs for locals. Once operational, the stadium will attract visitors, leading to increased business for local shops and services."'
    }, {
        title: '5-Star Hotel Construction',
        image: 'https://firebasestorage.googleapis.com/v0/b/luo-app-d2356.appspot.com/o/5star-hotel.jfif?alt=media&token=e1a61f93-cb0b-4942-a811-332ddf8f9b54',
        desc: 'Concept art or architectural renderings of the proposed hotel',
        importance: ' "In tandem with the stadium, plans include the construction of a 5-star hotel. This not only adds a touch of luxury but also provides accommodation for tourists, further boosting the local economy."'

    }, {
        title: 'Job Opportunities',
        image: 'https://firebasestorage.googleapis.com/v0/b/luo-app-d2356.appspot.com/o/stadium_construction.jfif?alt=media&token=906cf9da-9f6f-468f-ad44-a69af32b76d3',
        desc: 'Photos of locals working on the construction site or engaging in various job roles.',
        importance: '"The stadium project is a source of employment for our community. From skilled labor during construction to stadium management and hospitality jobs, it\'s an opportunity for Langi to contribute their skills and talents."'
    }, {
        title: 'Community Facilities',
        image: 'https://firebasestorage.googleapis.com/v0/b/luo-app-d2356.appspot.com/o/community_event_5.jfif?alt=media&token=7fa48046-aacb-46e5-bdc4-04779fe93d67',
        desc: 'Mock-ups or visuals of community events and gatherings at the stadium.',
        importance: '"Akii Bua Stadium goes beyond sports—it\'s a place for community events, cultural celebrations, and gatherings. It will be a focal point for fostering a sense of pride and unity among the Langi people."'
    }, {
        title: 'Educational Initiatives',
        image: 'https://firebasestorage.googleapis.com/v0/b/luo-app-d2356.appspot.com/o/sprinting.jfif?alt=media&token=9ba9bde5-9860-4a89-b73f-61edbc1e4d53',
        desc: 'Photos of sports training sessions, youth events, or educational programs.',
        importance: '"The stadium will also be a platform for educational initiatives, providing a space for sports programs, training, and youth development. It\'s an investment in the future of our community."'

    }, {
        title: 'Sports Academies',
        desc: ' Concept art of sports facilities within the stadium, perhaps with young athletes in training.',
        image: 'https://firebasestorage.googleapis.com/v0/b/luo-app-d2356.appspot.com/o/sports_academy.jpg?alt=media&token=d8d893b8-96f1-4dba-af59-7e41adbb1e69',
        importance: '"Akii Bua Stadium isn\'t just a venue for sports events; it\'s a catalyst for sports excellence. The stadium will house state-of-the-art facilities, nurturing the growth of sports academies. Young talents from the Lango community will have access to top-notch training, coaching, and mentorship programs."'
    }, {
        title: 'Tourist Site Improvement',
        image: 'https://firebasestorage.googleapis.com/v0/b/luo-app-d2356.appspot.com/o/tourist_site_improvement.jpg?alt=media&token=c9207de2-a46e-4884-82a6-55ec52c7be30',
        desc: 'Visuals of the stadium integrated into a scenic landscape, showcasing the potential for tourism.',
        importance: '"Beyond its impact on sports, the stadium will transform into a tourist destination. Plans include beautification and enhancement of the surrounding areas, making it an attractive spot for visitors. This not only puts Lango on the map but also boosts local tourism."'
    }, {
        title: 'Cultural Showcase',
        image: 'https://firebasestorage.googleapis.com/v0/b/luo-app-d2356.appspot.com/o/cultural_heritage.jfif?alt=media&token=c09595c2-c44e-48aa-9d20-61f10e086b79',
        desc: ' Mock-ups of cultural elements integrated into the stadium architecture',
        importance: ' "The stadium will serve as a cultural showcase, incorporating elements of Lango heritage into its design. This not only preserves our rich cultural identity but also invites visitors to experience the uniqueness of the Langi community."'
    }, {
        title: 'Youth Empowerment',
        image: 'https://firebasestorage.googleapis.com/v0/b/luo-app-d2356.appspot.com/o/youth_empowerment.jfif?alt=media&token=fdb3da67-7dff-4307-8a34-ef33085666b9',
        importance: '"By providing a platform for sports and cultural activities, the stadium becomes a powerful tool for youth empowerment. It encourages participation, leadership, and a sense of belonging among the younger generation."',
        desc: 'Collage of youth engagement, showcasing activities within the stadium.'
    },
]
