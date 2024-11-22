/** @format */

import Room from './pages/Room';
import UploadForm from './components/UploadForm';
import AuthPage from './pages/AuthPage';

export default function Home() {
	return (
		<>
			<UploadForm></UploadForm>
			<Room></Room>
		</>
	);
}
