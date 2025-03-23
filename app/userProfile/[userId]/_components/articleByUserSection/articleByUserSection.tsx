import styles from './articleByUserSection.module.css'
import {ArticleScheme, LoginStatusScheme, UserProfileScheme} from "@/types";
import {RootState} from "@/redux/store";
import {useSelector} from "react-redux";
import {getDataFromServerWithJson} from "@/lib-client/fetch";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";
import {produceWithPatches} from "immer";


interface props {
    userProfile?: UserProfileScheme
}

export default function ArticleByUserSection(props: props) {

    return (
        <div className={styles.div_0}>
            {props.userProfile?.articleCreatedBy.map((article: ArticleScheme, index) => <ArticleContainer article={article} key={index}/>)}
        </div>
    )
}
