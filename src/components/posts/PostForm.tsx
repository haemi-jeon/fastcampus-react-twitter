import { FiImage } from 'react-icons/fi';

const handleFileUpload = () => {
	//
};

export default function PostForm() {
	return (
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
				<input type="submit" value="Tweet" className="post-form__submit-btn" />
			</div>
		</form>
	);
}
