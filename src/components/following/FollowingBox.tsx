import AuthContext from 'context/AuthContext';
import {
	arrayRemove,
	arrayUnion,
	doc,
	onSnapshot,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostProps } from 'pages/home';
import { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface FollowProps {
	post: PostProps;
}

interface UserProps {
	id: string;
}

export default function FollowingBox({ post }: FollowProps) {
	const { user } = useContext(AuthContext);
	const [postFollowers, setPostFollowers] = useState<any>([]);

	const onClickFollow = async (e: any) => {
		e.preventDefault();

		try {
			if (user?.uid) {
				// 로그인 당사자가 주체가 되어 '팔로잉' 컬렉션 생성 or 업데이트
				const followingRef = doc(db, 'following', user?.uid);

				await setDoc(
					followingRef,
					{ users: arrayUnion({ id: post?.uid }) },
					{ merge: true }
				);

				// 게시글 작성자가 주체가 되어 '팔로워' 컬렉션 생성 or 업데이트
				const followerRef = doc(db, 'follower', post?.uid);

				await setDoc(
					followerRef,
					{ users: arrayUnion({ id: user?.uid }) },
					{ merge: true }
				);

				toast.success('팔로우를 했습니다.');
			}
		} catch (e) {
			console.log(e);
		}
	};

	const onClickDeleteFollow = async (e: any) => {
		e.preventDefault();

		try {
			if (user?.uid) {
				const followingRef = doc(db, 'following', user?.uid);
				await updateDoc(followingRef, {
					users: arrayRemove({ id: post?.uid }),
				});

				const followerRef = doc(db, 'follower', post?.uid);
				await updateDoc(followerRef, {
					users: arrayRemove({ id: user?.uid }),
				});

				toast.success('팔로우를 취소했습니다.');
			}
		} catch (e) {
			console.log(e);
		}
	};

	const getFollowers = useCallback(async () => {
		if (post?.uid) {
			const ref = doc(db, 'follower', post.uid);
			onSnapshot(ref, (doc) => {
				setPostFollowers([]);

				doc
					?.data()
					?.users?.map((user: UserProps) =>
						setPostFollowers((prev: UserProps[]) =>
							prev ? [...prev, user?.id] : []
						)
					);
			});
		}
	}, [post.uid]);

	useEffect(() => {
		if (post?.uid) getFollowers();
	}, [getFollowers, post.uid]);

	return (
		<>
			{user?.uid !== post?.uid &&
				(postFollowers?.includes(user?.uid) ? (
					<button className="post__following-btn" onClick={onClickDeleteFollow}>
						Following
					</button>
				) : (
					<button className="post__follow-btn" onClick={onClickFollow}>
						Follow
					</button>
				))}
		</>
	);
}
