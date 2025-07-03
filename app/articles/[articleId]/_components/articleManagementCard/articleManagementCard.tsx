import styles from './articleManagementCard.module.css'
import {AiOutlineEdit} from "react-icons/ai";
import {FaRegTrashCan} from "react-icons/fa6";
import classNames from "classnames";
import {ArticleScheme} from "@/types";
import {postDataToServerWithJson} from "@/lib/lib-client/fetch";
import {useRouter} from "next/navigation";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";

interface props {
    article: ArticleScheme
}

export default function ArticleManagementCard(props: props) {
    const appendError = useErrorStore(state => state.appendError)
    const router = useRouter()

    const clickEventHandler_deleteArticle = () => {
        deleteArticle()
            .then((json) => {
                if(!!json){
                    router.push('/')
                }
            }).catch((error) => {
                appendError(error)

        })
    }

    const clickEventHandler_editArticle = () => {
        sessionStorage.setItem('articleToEdit', JSON.stringify(props.article));
        router.push('/createArticle')
    }

    const deleteArticle = async () => {
        return await postDataToServerWithJson<{isDeleted: boolean, error: string}>('/api/deleteArticle', props.article)
    }

    return (
        <div className={styles.div_0}>
            <div className={classNames(styles.div_1, styles.edit)} onClick={clickEventHandler_editArticle}>
                <AiOutlineEdit className={styles.AiOutlineEdit}/>
                <p className={classNames(styles.p_0, styles.edit)}>記事を編集</p>
            </div>
            <div className={classNames(styles.div_1, styles.trash)} onClick={clickEventHandler_deleteArticle}>
                <FaRegTrashCan className={styles.FaRegTrashCan} />
                <p className={classNames(styles.p_0, styles.trash)}>記事を削除</p>
            </div>
        </div>
    )
}
