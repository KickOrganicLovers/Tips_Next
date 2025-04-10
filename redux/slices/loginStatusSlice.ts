import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FollowScheme, LikeScheme, LoginStatusScheme, UserProfileScheme, WatchHistoryScheme} from "@/types";
import {produce, WritableDraft} from "immer";
import {isToday} from "@/lib-client/processing";


// 初期ステート。isLoggedInはその名の通りログインしているかどうかのパラメータでしているならtrue。errorはfalseの場合のerrorメッセージ。
// userProfileはログイン時に取得させる各種ユーザー情報。うちuserIdとusernameは必須。userIdはprismaのcreate時に自動生成されるがusernameはされないので
// アカウント作成時に入力させる必要あり。


const initialState: LoginStatusScheme = {
    isLoggedIn: false,
    error: '',
    userProfile: {
        userId: '',
        username: '',
        profileImageUrl: 'https://tipsimgcontainer.s3.ap-northeast-1.amazonaws.com/notLoggedIn-profile.jpeg',
        introduction: '',
        articleCreatedBy: [],
        likes: [],
        followings: [],
        followers: [],
        watchHistories: [],
        createdAt: '',
    }
}

//ログインステータスを管理するためのスライス。初期ステートであるinitialStateは上記の定義を用いている。

const LoginStatusSlice = createSlice({
    name: 'LoginStatus',
    initialState: initialState,
    //reducers、各種reducerの呼び出し方は
    //const dispatch = useDispatch()
    //dispatch([reducer]('変更後の値')
    //なお、変更後の値の型の指定は各reducer関数の引数action: PayloadAction<T>のジェネリクスTで示される。
    reducers: {
        //isLoggedIn、ログインしているかどうかを設定する。dispatch(setIsLoggedIn(true|false))といった形で呼び出す。
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        //error、エラーを設定する。ない場合は''
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        //userProfile、ユーザー情報を設定する。プロフィールの更新など、ログイン中にuserProfileのみを更新したいときに使う。
        setUserProfile: (state, action: PayloadAction<UserProfileScheme>) => {
            Object.assign(state.userProfile, action.payload)
        },
        //LoginStatus、ログイン情報全体を設定するときに使う。最も重要。ログインする際に各種情報をLoginStatusScheme型に加工し、dispatchする。
        setLoginStatus: (state, action: PayloadAction<LoginStatusScheme>) => {
            return action.payload
        },

        //likes、記事に対するいいねの情報を更新するときに使う。likesをはじめとした配列パラメータでは、それぞれのページ（likesならapp/likes）を訪れた際に
        //likesを全体更新することを避けるため、いいねに変化があったときにredux、postgresの間で別々にデータの更新を行い、疑似的に同期している。詳しい処理は
        //likeButton、postLikesを参照。
        editLikes: (state, action: PayloadAction<{like: LikeScheme, remove: boolean}>) => {
            if(action.payload.remove){
                state.userProfile.likes = state.userProfile.likes.filter(like => like.id !== action.payload.like.id)
            }else {
                if (action.payload.like && !state.userProfile.likes.some(like => like.id === action.payload.like.id)) {
                    state.userProfile.likes.push(action.payload.like as WritableDraft<LikeScheme>);
                }
            }
        },
        //followings、フォロー、フォロワーを管理するためのもの。基本的な仕組みはlikesと同じ。
        editFollowings: (state, action: PayloadAction<{following: FollowScheme, remove: boolean}>) => {
            if(action.payload.remove){
                state.userProfile.followings = state.userProfile.followings.filter(following => following.id !== action.payload.following.id)
                console.log('followings' + state.userProfile.followings);
            }else {
                console.log(action.payload)
                if (action.payload.following && !state.userProfile.followings.some(following => following.id === action.payload.following.id)) {
                    state.userProfile.followings.push(action.payload.following as WritableDraft<FollowScheme>);
                }
            }
        },

        //watchHistories、視聴履歴を管理するためのもの。基本的な仕組みはlikesと同じ。
        appendWatchHistories: (state, action: PayloadAction<WatchHistoryScheme>) => {
            const previousWatchHistory = state.userProfile.watchHistories.filter((watchHistory) => watchHistory.userId === action.payload.userId && watchHistory.articleId === action.payload.articleId && isToday(watchHistory.createdAt))
            if(previousWatchHistory && previousWatchHistory.length > 0){
                state.userProfile.watchHistories = [...state.userProfile.watchHistories.filter((watchHistory) => watchHistory.userId !== action.payload.userId || watchHistory.articleId !== action.payload.articleId || !isToday(watchHistory.createdAt)), action.payload as WritableDraft<WatchHistoryScheme>]
            }else {
                state.userProfile.watchHistories = [...state.userProfile.watchHistories, action.payload as WritableDraft<WatchHistoryScheme>]
            }
        }
    }
})

//各種reducerをexport
export const {setIsLoggedIn, setError, setUserProfile, setLoginStatus, editLikes, editFollowings, appendWatchHistories} = LoginStatusSlice.actions

export const LoginStatusReducer = LoginStatusSlice.reducer

export default LoginStatusSlice
