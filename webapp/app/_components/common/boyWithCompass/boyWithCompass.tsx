import Boy from '@/public/images/boy.svg'

interface props {
    className: string;
}

export default function BoyWithCompass(props: props) {
    return (
        <div className={props.className}>
            <Boy/>
        </div>
    )
}
