import {Dispatch, SetStateAction, useState} from "react";
import styles from './categoryCard.module.css'
import {useRouter} from "next/navigation";
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";
import {AiOutlinePlus} from "react-icons/ai";
import {useCategoriesStore} from "@/lib/lib-client/stores/categoriesStore";

interface props {
    setSideBarStatus: Dispatch<SetStateAction<{ isActive: boolean }>>
}

export default function CategoryCard(props: props) {
    const [parentCategoryIdOnFocus, setParentCategoryIdOnFocus] = useState<string>('');
    const className = !!parentCategoryIdOnFocus ? `${styles['div_3']} ${styles['shifted']}` : styles['div_3']
    const categories = useCategoriesStore(state => state.categories)
    const router = useRouter()



    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>カテゴリーで探す</div>
            <div className={styles.div_2}>
                <div className={className}>
                    <div className={styles.div_4}>
                        {categories.map((category, index) => (
                            <div className={styles.div_5} key={index} onClick={() => {
                                setParentCategoryIdOnFocus(category.id)
                            }}>
                                <div className={styles.div_6}>
                                    {category.categoryName}
                                </div>
                                <MdArrowForwardIos className={styles.MdArrowForwardIos}/>
                            </div>
                        ))}
                    </div>
                    <div className={styles.div_4}>
                        {(() => {
                            const parent = categories.filter((category, index) => category.id === parentCategoryIdOnFocus)[0]
                            if (!!parent && !!parent.children) {
                                return parent.children.map((child, index) => (
                                    <div className={styles.div_5} key={index} onClick={() => {
                                        router.push(`/categories/${child.id}`);
                                        props.setSideBarStatus({isActive: false});
                                        setParentCategoryIdOnFocus('')
                                    }}>
                                        <div className={styles.div_6}>
                                            {child.categoryName}
                                        </div>
                                        <AiOutlinePlus className={styles.AiOutlinePlus}/>
                                    </div>
                                ))
                            }
                        })()
                        }
                        {/*<div className={styles.div_7}>*/}
                        {/*    <MdArrowBackIos className={styles.MdArrowBackIos} onClick={() => {*/}
                        {/*        setParentCategoryIdOnFocus('')*/}
                        {/*    }}/>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
        // <div className={styles.div_0}>
        //     <div className={styles.div_1}>カテゴリーで探す</div>
        //     {categories.map((category, index) => (
        //         <div className={styles.div_2} key={index}>
        //             <div className={className} onClick={() => {setIsActive(!isActive)}}>
        //                 {category.categoryName}
        //             </div>
        //             <ul className={styles.ul_0} style={{height: isActive && category.children ? `${category.children.length * 36}px` : '0'}}>
        //                 {category.children?.map((children, i) => (
        //                     <li className={styles.li_0} key={i} onClick={() => {
        //                         router.push(`/categories/${children.id}`);
        //                         props.setSideBarStatus({isActive: false})
        //                     }}>{children.categoryName}</li>
        //                 ))}
        //             </ul>
        //         </div>
        //     ))}
        // </div>
    )
}
