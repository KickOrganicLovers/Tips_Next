interface props {
    email: string
    token: string
}

export default function VerificationEmailTemplate(props: props) {
    return (
        <div>
            <h1>Thanks for your trying to register for tips, {props.email}.</h1>
            <h2>Your token is {props.token}.</h2>
        </div>
    )
}
