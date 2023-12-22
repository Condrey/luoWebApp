import Link from "next/link";
import {badgeVariants} from "@/components/ui/badge";
import {ArrowLeft} from "lucide-react";

export default function NavigateBack() {
    return <div>
        <Link title='Navigate back to grievances' href={'/grievances'} className={badgeVariants({variant: "default"})}>
            <ArrowLeft/>
            Back
        </Link>

    </div>
}
