
import  Head  from 'next/head';
import {MenuWrapper} from "../context/menu";
import {AuthWrapper} from "../context/auth";
import {SettingsWrapper} from "../context/settings";
import "/styles/globals.css";
import {NavbarWrapper} from "../context/navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous"/>
          <link rel="stylesheet" href="https://bootswatch.com/5/sandstone/bootstrap.min.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
              integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
              crossOrigin="anonymous" referrerPolicy="no-referrer"/>
      </Head>

        <AuthWrapper>
            <NavbarWrapper>
                <SettingsWrapper>
                    <MenuWrapper>
                        <Component {...pageProps} />
                    </MenuWrapper>
                </SettingsWrapper>
            </NavbarWrapper>
        </AuthWrapper>

    </>
  )
}

export default MyApp
