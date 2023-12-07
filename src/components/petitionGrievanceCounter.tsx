import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export default function PetitionGrievanceCounter() {
    const noOfPetitions: Number = 11145
    const noOfComments: Number = 45
    const cards: { title: String, number: Number | undefined, description: String | undefined }[] = [
        {title: 'Petitions', number: noOfPetitions, description: 'Signatures'},
        {title: 'Grievances', number: noOfComments, description: 'Posts'},
    ]

    return <div className='flex flex-row gap-2 px-2 items-center justify-center'>
        {cards.map((card) => (
            <Card key={card.title.toString()}
                  className='border-2  px-2 md:px-5'>
                <CardHeader className='flex flex-col items-center'>
                    <CardTitle>{card.number?.toLocaleString()} </CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col items-center'>
                    <span>{card.title.toUpperCase()}</span>
                </CardContent>
            </Card>
        ))

        }
    </div>

}
