import Girl from '@/public/images/girlWithBook.svg'

interface props {
    className: string;
}

export default function GirlWithBook(props: props) {
    return (
        <div className={props.className}>
            <Girl/>
        </div>
    )
}
