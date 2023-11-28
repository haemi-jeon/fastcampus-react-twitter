import { FiImage } from 'react-icons/fi';
import { FaUserCircle, FaRegComment } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export interface PostProps {
	id: string;
	email: string;
	content: string;
	createAt: string;
	uid: string;
	profileUrl?: string;
	likes?: string[];
	likeCount?: number;
	comments?: any;
}

const posts: PostProps[] = [
	{
		id: '1',
		email: 'test@test.com',
		content: '내용입니다.',
		createAt: '2023-08-30',
		uid: '123123',
	},
	{
		id: '2',
		email: 'test@test.com',
		content: '내용입니다.',
		createAt: '2023-08-30',
		uid: '123123',
	},
	{
		id: '3',
		email: 'test@test.com',
		content: '내용입니다.',
		createAt: '2023-08-30',
		uid: '123123',
	},
	{
		id: '4',
		email: 'test@test.com',
		content: '내용입니다.',
		createAt: '2023-08-30',
		uid: '123123',
	},
	{
		id: '5',
		email: 'test@test.com',
		content: '내용입니다.',
		createAt: '2023-08-30',
		uid: '123123',
	},
	{
		id: '6',
		email: 'test@test.com',
		content: '내용입니다.',
		createAt: '2023-08-30',
		uid: '123123',
	},
];

const handleFileUpload = () => {
	//
};

const handleDelete = () => {
	//
};

export default function HomePage() {
	return (
		<div className="home">
			<div className="home__title">Home</div>
			<div className="home__tabs">
				<div className="home__tab home__tab--active">For You</div>
				<div className="home__tab">Following</div>
			</div>
			{/* Post Form */}
			<form className="post-form">
				<textarea
					name="content"
					id="content"
					className="post-form__textarea"
					placeholder="What is happening?"
					required
				/>
				<div className="post-form__submit-area">
					<label htmlFor="file-input" className="post-form__file">
						<FiImage className="post-form__file-icon" />
					</label>
					<input
						type="file"
						name="file-input"
						className="hidden"
						accept="image/*"
						onChange={handleFileUpload}
					/>
					<input
						type="submit"
						value="Tweet"
						className="post-form__submit-btn"
					/>
				</div>
			</form>
			{/* Tweet posts */}
			<div className="post">
				{posts?.map((post) => (
					<div className="post__box" key={post?.id}>
						<Link to={`/posts/${post?.id}`}>
							<div className="post__box-profile">
								<div className="post__flex">
									{post?.profileUrl ? (
										<img
											src={post?.profileUrl}
											className="post__box-profile-img"
											alt="profile"
										/>
									) : (
										<FaUserCircle className="post__box-profile-icon" />
									)}
									<div className="post__email">{post?.email}</div>
									<div className="post__createAt">{post?.createAt}</div>
								</div>
								<div className="post__box-content">{post?.content}</div>
							</div>
						</Link>
						<div className="post__box-footer">
							{/* post.uid === user.uid 일 때 */}
							<>
								<button
									type="button"
									className="post__delete"
									onClick={handleDelete}
								>
									Delete
								</button>
								<button type="button" className="post__edit">
									<Link to={`/posts/edit/${post?.id}`}>Edit</Link>
								</button>
							</>
							<button type="button" className="post__likes">
								<AiFillHeart />
								{post?.likeCount || 0}
							</button>
							<button type="button" className="post__comments">
								<FaRegComment />
								{post?.comments?.length || 0}
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
