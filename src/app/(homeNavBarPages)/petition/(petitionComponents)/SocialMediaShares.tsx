import SocialMediaShare from "@/components/social-media-share";
import {webPetitionLink} from "@/lib/constants/Constants";

export default function SocialMediaShares() {
    return <div className='max-w-7xl flex flex-col  gap-6 px-3'>
        <span className='text-2xl'>Share this petition, click these cards to share</span>
        <div className='flex flex-col  gap-12'>
            {prepopulatedTweets.map((prepopulatedTweet) => {
                const tweets: string[] = prepopulatedTweet.tweets

                return <div key={prepopulatedTweet.ageGroup} className='flex flex-col  gap-6'>

                    <span className='text-2xl font-bold uppercase'>{prepopulatedTweet.ageGroup}</span>

                    <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {
                            tweets.map((tweet, index) => (
                                <div key={index}
                                     className='bg-gradient-to-b from-fuchsia-600/10 dark:from-fuchsia-600 p-3 hover:bg-fuchsia-300 shadow-md hover:dark:bg-fuchsia-950  rounded-md aspect-video md:aspect-square flex flex-col justify-between sm:justify-center items-center text-center gap-6'>
                                    <p className='whitespace-pre-line'>{tweet}</p>
                                    <div className='max-w-sm'>
                                        <SocialMediaShare text={`${tweet} \n\n\nSIGN THE PETITION\n`}
                                                          url={webPetitionLink}/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>


                </div>
            })}
        </div>
    </div>
}


const prepopulatedTweets = [
    {
        ageGroup: 'Young Adults (18-25)', tweets: [
            'Just added my voice to the call for Akii Bua Stadium! 🏟️ Let\'s make history together - sign the petition now and be part of something legendary! \n\n#AkiiBuaLegacy #YouthForChange',
            'Signing the petition for Akii Bua Stadium because our dreams deserve a home. Join me, let\'s create a legacy that echoes through the generations. \n\n🌟 #LegacyBuilders #AkiiBuaStadium',
            'Young voices, big dreams! I\'ve just signed the petition for the Akii Bua Stadium in Lira. Let\'s show the world what our community can achieve when we stand united. \n\n🌍 #CommunityPride #AFCONinUganda',
            'Swipe up to be part of something incredible! Signing the Akii Bua Stadium petition - because our community\'s story deserves to be told in the grandest way possible. \n\n🚀 #SnapForChange #AkiiBuaCampaign',
            'Duet this and join the movement! Signing the petition for Akii Bua Stadium - because legends deserve legendary arenas. Let\'s make it happen! \n\n🎤 #AkiiBuaChallenge #CommunitySpirit'
        ]
    },
    {
        ageGroup: 'Adults (26-40)', tweets: [
            'Just added my professional signature to the Akii Bua Stadium petition. Let\'s demonstrate the power of community support and build a legacy that stands the test of time. \n\n🤝 #ProfessionalImpact #AkiiBuaStadium',
            'Taking a moment from the daily grind to sign the petition for Akii Bua Stadium. Our community deserves a symbol of pride and unity. \n\nJoin me! 🏟️ #AkiiBuaPride #CommunityLeadership',
            'In the hustle and bustle of life, let\'s not forget the dreams we share. Signed the Akii Bua Stadium petition - because our community\'s legacy is worth fighting for. \n\n💪 #CommunityDreams #AkiiBuaForever',
            'Work hard, dream big, and build a legacy. I\'ve just signed the Akii Bua Stadium petition - a testament to our shared history. Join me, let\'s make it a reality! \n\n🌐 #CommunityBuilders #AkiiBuaStadium',
            '🖋️ Signed the petition for Akii Bua Stadium. Here\'s to preserving our history, celebrating our community, and building a legacy for the next generation. \n\nJoin the movement! 🏟️ #LegacyMakers #CommunityLove'
        ]
    },
    {
        ageGroup: 'Middle-Aged (41-60)', tweets: [
            'At this stage in life, it\'s about leaving a legacy. Just signed the Akii Bua Stadium petition - because our community\'s story deserves a grand stage. \n\nJoin me in making history! 🌟 #AkiiBuaLegacy #CommunityPride',
            'Time moves fast, but our memories endure. Signing the petition for Akii Bua Stadium - a tribute to our shared history and the legacy we\'re building for the future. \n\n🕰️ #AkiiBuaMemories #CommunityUnity',
            'Reflecting on the impact of John Akii Bua and taking action. Signed the petition for Akii Bua Stadium - a symbol of community strength and resilience. \n\nJoin the cause! 🏟️ #CommunityLeadership #AkiiBuaStadium',
            'Our journey has shaped us, and our actions define our legacy. Just added my name to the Akii Bua Stadium petition - because our community\'s story deserves to be celebrated. \n\n🎉 #CommunityJourney #AkiiBuaCampaign',
            'Signed the Akii Bua Stadium petition today. It\'s not just about a stadium; it\'s about preserving our heritage and creating a lasting legacy for generations to come. \n\n🏟️ #LegacyPreservation #CommunityVoice',
        ]
    },
    {
        ageGroup: 'Seniors (61+)', tweets: [
            'With each passing year, the importance of legacy grows. Today, I signed the Akii Bua Stadium petition - a tribute to our shared history and the generations that will follow. \n\nJoin the cause! 🌹 #AkiiBuaLegacy #CommunityHeritage',
            'In my time, John Akii Bua inspired us all. Today, I signed the petition for Akii Bua Stadium - a heartfelt tribute to a hero and a community\'s resilience. \n\n🏟️ #AkiiBuaTribute #CommunityStrength',
            '🖋️ Proudly added my signature to the Akii Bua Stadium petition. Let\'s ensure our stories live on through this symbol of community pride. Join me in making history! \n\n🌍 #AkiiBuaStadium #CommunityLegacy',
            'Supporting the Akii Bua Stadium campaign - because our shared history deserves to be celebrated. Join the cause and let\'s leave a legacy for generations to come. \n\n🏟️ #AkiiBuaLegacy #CommunitySupport',
            'Today, I added my voice to the call for Akii Bua Stadium. It\'s not just a petition; it\'s a testament to the enduring spirit of our community. Join us in building a legacy! \n\n🌟 #CommunitySpirit #AkiiBuaStadium',
        ]
    },

]
