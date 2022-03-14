
function Following({ urlname }) {
  const [followingData, setfollowingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Follower counts, displayname, image
  const onSnapshot = useCallback((snapshot) => {
    snapshot.forEach((doc) => {
      dataRef.doc(doc.id.toLowerCase()).onSnapshot((followerDoc) => {
        const data = followerDoc.data();
        // push new document data into an array
        setfollowingData((prev) => [
          ...prev,
          {
            profileName: doc.id,
            displayName: data.userName,
            followerCount: data.followers !== undefined ? data.followers : 0,
            followingCount: data.following !== undefined ? data.following : 0,
            image: data.imageUrl ? data.imageUrl : null
          }
        ]);
        // or set the new data to state, by just setting the document data
        setfollowingData(data);
        setIsLoading(false);
      });
    });
  }, []);

  useEffect(() => {
    const dataRef = firestore().collection("usernames");

    const cleanup = dataRef
      .doc(urlname)
      .collection("Following")
      .onSnapshot(onSnapshot);

    return cleanup;
  }, [onSnapshot, urlname]);

  return (
    <>
      {isLoading && <p>Loading</p>}
      {!isLoading && <p>Show data {followingData.length}</p>}
    </>
  );
}