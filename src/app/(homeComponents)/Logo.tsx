import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/Transparent Backgrounds (1).png";
import {webPageName} from "@/lib/constants/Constants";
import {lusitana} from "@/app/ui/fonts";
import {cn} from "@/lib/utils";

export default function Logo() {
    return <div>
        <Link href="/" className={cn(lusitana.className, `flex  items-center gap-1 `)}>
            <Image src={logo} alt={"Luo.com logo"} width={40} height={40} className=' '/>
            <span className='font-bold text-slate-700 uppercase'>{webPageName}</span>
        </Link>
    </div>
}
