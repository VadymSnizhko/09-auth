import css from './AuthNavigation.module.css'
import Link from "next/link"


const AuthNavigation = () => {
    //prefetch={false}
    return (
        <>
            <li className={css.navigationItem}>
                <Link href="/profile"   className={css.navigationLink}>
                    Profile
                </Link>
            </li>

            <li className={css.navigationItem}>
                <p className={css.userEmail}>User email</p>
                <button className={css.logoutButton}>
                    Logout
                </button>
            </li>

            <li className={css.navigationItem}>
                <Link href="/sing-in"   className={css.navigationLink}>
                    Login
                </Link>
            </li>

            <li className={css.navigationItem}>
                <Link href="/sing-up"   className={css.navigationLink}>
                    Sign up
                </Link>
            </li>
        </>

    )
}

export default AuthNavigation