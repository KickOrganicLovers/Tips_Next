import styles from './articleSettingsSection.module.css'
import React, {Dispatch, SetStateAction, useCallback, useRef, useState} from "react";
import ImageEditingCard
    from "@/app/createArticle/_components/articleSettingsSection/atoms/imageEditingCard/imageEditingCard";
import TagAdditionCard
    from "@/app/createArticle/_components/articleSettingsSection/atoms/tagAdditionCard/tagAdditionCard";
import CategorySelectionCard
    from "@/app/createArticle/_components/articleSettingsSection/atoms/categorySelectionCard/categorySelectionCard";

interface props {
    setThumbnailImageAsBase64: Dispatch<SetStateAction<string>>
    setCategoryId: Dispatch<SetStateAction<number>>
    tags: string[]
    setTags: Dispatch<SetStateAction<string[]>>
}

export default function ArticleSettingsSection(props: props) {



    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <div>
                    <h1 className={styles.h1_0}>サムネイル画像の選択</h1>
                    <ImageEditingCard setThumbnailImageAsBase64={props.setThumbnailImageAsBase64}/>
                </div>
                <div>
                    <h1 className={styles.h1_0}>カテゴリーの選択</h1>
                    <CategorySelectionCard setCategoryId={props.setCategoryId}/>
                </div>
                <div>
                    <h1 className={styles.h1_0}>タグの追加</h1>
                    <TagAdditionCard tags={props.tags} setTags={props.setTags} />
                </div>
                {/*<div className={styles.div_2}>*/}
                {/*    <div>*/}
                {/*        <h2 className={styles.h2_0}>タグを追加</h2>*/}
                {/*        <TagAdditionCard/>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <h2 className={styles.h2_0}>カテゴリーの選択</h2>*/}
                {/*        <CategorySelectionCard/>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}
