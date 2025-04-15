import styles from './extendedArticleContainer.module.css'
import {ArticleScheme} from "@/types";
import {IoHeart} from "react-icons/io5";
import {MdCategory} from "react-icons/md";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useRouter} from "next/navigation";

interface props {
    article: ArticleScheme
}

export default function ExtendedArticleContainer(props: props) {
    const router = useRouter()

    const clickEventHandler = () => {
        router.push(`/articles/${props.article.id}`)
    }



    return (
        <div className={styles.virtual_wrapper}>
            <div className={styles.div_0} onClick={clickEventHandler}>
                <div className={styles.div_1}>
                    <div className={styles.div_3}>
                        <img src={props.article.thumbnailImageUrl} alt='articleThumbnail' className={styles.img_0}/>
                    </div>
                    <div className={styles.div_4}>
                        {props.article.title}
                    </div>
                    <p className={styles.p_6}>{`${new Date(props.article.createdAt).toLocaleDateString('ja-JP', {timeZone: 'Asia/Tokyo'})}に作成`}</p>
                </div>
                <div className={styles.div_2}>
                    <div className={styles.div_5}>
                        <div className={styles.div_9}>
                            <img src={props.article.authorProfile.profileImageUrl} alt='authorProfile'
                                 className={styles.img_1}/>
                            <p className={styles.p_0}>{props.article.authorProfile.username}</p>
                        </div>
                        <p className={styles.p_1}>{`${props.article.authorProfile.followers.length} フォロワー`}</p>
                    </div>
                    <div className={styles.div_6}>
                        <IoHeart className={styles.IoHeart}/>
                        <p className={styles.p_2}>{props.article.likes.length}</p>
                    </div>
                    <div className={styles.div_7}>
                        <MdCategory className={styles.MdCategory}/>
                        <p className={styles.p_3}>{props.article.category.categoryName}</p>
                    </div>
                    <div className={styles.div_8}>
                        {props.article.tags.map((tag, index) => (
                            <div className={styles.div_10} key={index}>
                                <p className={styles.p_4}>＃</p>
                                <p className={styles.p_5}>{tag.tagName}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
