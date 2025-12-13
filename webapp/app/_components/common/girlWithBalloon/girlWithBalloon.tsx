import Girl from '@/public/images/girlWithBalloon.svg'

interface props {
    className: string;
}

export default function GirlWithBalloon(props: props) {
    return (
        <div className={props.className}>
            <Girl/>
        </div>
    )
}
