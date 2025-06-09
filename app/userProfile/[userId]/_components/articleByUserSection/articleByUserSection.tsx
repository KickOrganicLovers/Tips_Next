import styles from './articleByUserSection.module.css'
import {ArticleScheme, UserProfileScheme} from "@/types";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";
import {SessionContextValue} from "next-auth/react";
import GirlWithBalloon from "@/public/images/girlWithBalloon.svg";
import Link from "next/link";
import React from "react";
import GirlWithBook from "@/app/_components/common/girlWithBook/girlWithBook";
import {AiOutlineEdit, AiOutlinePlus} from "react-icons/ai";


interface props {
    userProfile?: UserProfileScheme
}

export default function ArticleByUserSection(props: props) {

    return (
        <div className={styles.div_0}>
            {props.userProfile?.articleCreatedBy.length === 0 ?
                undefined
                :
                <h2 className={styles.h2_0}>作成した記事</h2>
            }
            <div className={styles.div_1}>
                {props.userProfile?.articleCreatedBy.map((article: ArticleScheme, index) => <ArticleContainer article={article} key={index}/>)}
                {props.userProfile?.articleCreatedBy.length === 0?
                    <div className={styles.div_2}>
                        <GirlWithBook className={styles.GirlWithBook}/>
                        <h2 className={styles.h2_1}>作成した記事がここに表示されます</h2>
                        <h3 className={styles.h3_0}><Link className={styles.Link} href={'/createArticle'}>＋ 記事を作成する</Link></h3>
                    </div>
                    :
                    undefined
                }
            </div>
        </div>
    )
}
