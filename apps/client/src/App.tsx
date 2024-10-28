import { Suspense, lazy } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SearchContextProvider } from './context/search.context'
import { UserContextProvider } from './context/user.context'
import { UserGuard } from './guards/user.guard.tsx'

const HomePage = lazy(() => import('./pages/home/page/Home'))
const LoginPage = lazy(() => import('./pages/login/page/Login.tsx'))
const RegisterPage = lazy(() => import('./pages/register/page/Register'))
const ContentDetailPage = lazy(
	() => import('./pages/contentDetail/page/ContentDetail'),
)
const CreateContentPage = lazy(
	() => import('./pages/createContent/page/CreateContent'),
)

export default function App() {
	return (
		<>
			<Suspense>
				<UserContextProvider>
					<BrowserRouter>
						<Routes>
							<Route
								path="/"
								element={
									<SearchContextProvider>
										<HomePage />
									</SearchContextProvider>
								}
							/>
							<Route
								path="/login"
								element={
									<>
										<LoginPage />
									</>
								}
							/>
							<Route
								path="/register"
								element={
									<>
										<RegisterPage />
									</>
								}
							/>
							<Route
								path="/create/content"
								element={
									<>
										<UserGuard roles={['CREATOR']}>
											<CreateContentPage />
										</UserGuard>
									</>
								}
							/>
							<Route
								path="/content/:contentId"
								element={
									<>
										<UserGuard>
											<ContentDetailPage />
										</UserGuard>
									</>
								}
							/>
							<Route path="*" element={<Navigate to="/" />} />
						</Routes>
					</BrowserRouter>
				</UserContextProvider>
				<Toaster />
			</Suspense>
		</>
	)
}
