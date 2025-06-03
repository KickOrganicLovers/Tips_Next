import styles from './sideBarContents_1.module.css'
import ImageEditingCard from "@/app/_components/sideBar/sideBarContents_1/atoms/imageEditingCard/imageEditingCard";
import CategorySelectionCard
    from "@/app/_components/sideBar/sideBarContents_1/atoms/categorySelectionCard/categorySelectionCard";
import TagAdditionCard from "@/app/_components/sideBar/sideBarContents_1/atoms/tagAdditionCard/tagAdditionCard";
import {MdArrowForwardIos} from "react-icons/md";
import {articleEditorStatusAtom, articleOnEditAtom, sideBarStatusAtom} from "@/lib/lib-client/atoms";
import {useAtom} from "jotai";

export default function SideBarContents_1() {
    const [sideBarStatus, setSideBarStatus] = useAtom(sideBarStatusAtom);
    const [articleOnEdit, setArticleOnEdit] = useAtom(articleOnEditAtom)
    const [articleEditorStatus, setArticleEditorStatus] = useAtom(articleEditorStatusAtom)


    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <MdArrowForwardIos className={styles.MdArrowForwardIos} onClick={() => {
                    setSideBarStatus({isActive: false})
                }}/>
                <h1 className={styles.h1_0}>記事の公開設定</h1>
            </div>
            <div className={styles.div_2}>
                <h2 className={styles.h2_0}>サムネイル画像</h2>
                <ImageEditingCard thumbnailImageUrl={articleOnEdit.thumbnailImageUrl}
                                  setArticleOnEdit={setArticleOnEdit} articleEditorStatus={articleEditorStatus}/>
            </div>
            <div className={styles.div_2}>
                <h2 className={styles.h2_0}>タグ</h2>
                <TagAdditionCard tags={articleOnEdit.tags} setArticleOnEdit={setArticleOnEdit} articleEditorStatus={articleEditorStatus}/>
            </div>
            <div className={styles.div_2}>
                <h2 className={styles.h2_0}>カテゴリー</h2>
                <CategorySelectionCard category={articleOnEdit.category} setArticleOnEdit={setArticleOnEdit} articleEditorStatus={articleEditorStatus}/>
            </div>
        </div>
    )
}
