import Video from "next-video";
import SampleVideo from '../../../videos/Uganda’s unifying events; John Akii- Bua.mp4'

const VideosSection = () => {
    return <div className='grid gap-4'>
        <Video src={SampleVideo}/>
    </div>
}

export default VideosSection
