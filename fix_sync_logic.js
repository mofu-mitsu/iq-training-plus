const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const importStr = "import { auth, loginWithGoogle, logout } from '../lib/firebase';";
const newImportStr = "import { auth, loginWithGoogle, logout, getUserData, saveUserData } from '../lib/firebase';";
code = code.replace(importStr, newImportStr);

const onAuthStr = `  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);`;

const newOnAuthStr = `  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const data = await getUserData(currentUser.uid);
        if (data) {
          useStore.setState({
            xp: data.xp !== undefined ? data.xp : useStore.getState().xp,
            level: data.level !== undefined ? data.level : useStore.getState().level,
            dailyStreak: data.dailyStreak !== undefined ? data.dailyStreak : useStore.getState().dailyStreak,
            highScores: data.highScores !== undefined ? data.highScores : useStore.getState().highScores,
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Sync store changes to Firebase
    const unsubscribe = useStore.subscribe((state) => {
      if (user) {
        saveUserData(user.uid, {
          xp: state.xp,
          level: state.level,
          dailyStreak: state.dailyStreak,
          highScores: state.highScores,
        });
      }
    });
    return () => unsubscribe();
  }, [user]);`;

code = code.replace(onAuthStr, newOnAuthStr);

fs.writeFileSync('app/page.tsx', code);
