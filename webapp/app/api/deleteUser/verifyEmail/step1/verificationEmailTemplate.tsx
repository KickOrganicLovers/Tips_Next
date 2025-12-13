interface props {
    email: string
    token: string
}

export default function VerificationEmailTemplate(props: props) {
    return (
        <div>
            <h1>この度はTipsをご利用していただきありがとうございました, {props.email}.</h1>
            <p>メールアドレスが本人のものであるかどうかの確認のため,このメールを送らせていただいています。以下のトークンを入力し、アカウントの削除へお進みください.</p>
            <h2 style={{color: 'deepskyblue'}}>{props.token}</h2>
        </div>
    )
}
