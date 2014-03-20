using UnityEngine;


public class RandomMatchmaker : Photon.MonoBehaviour
{
    private PhotonView myPhotonView;
	private Vector3 startingPosPlayer1 = new Vector3(1888, 8, 1829);
	private Vector3 startingPosPlayer2 = new Vector3(1854, 8, 1854);
	private int playerID;
	private bool connected = false;

    // Use this for initialization
    void Start()
    {
        PhotonNetwork.ConnectUsingSettings("0.1");
    }

    void OnJoinedLobby()
    {
        Debug.Log("JoinRandom");
        PhotonNetwork.JoinRandomRoom();
    }

    void OnPhotonRandomJoinFailed()
    {
        PhotonNetwork.CreateRoom(null);
    }

    void OnJoinedRoom()
    {
		GameObject monster;

		playerID = PhotonNetwork.player.ID;

		connected = true;
		
		if(playerID == 1)  // Player 1 has joined
		{
			monster = PhotonNetwork.Instantiate("YellowPrefab", startingPosPlayer1, Quaternion.identity, 0);
		}
		else
		{
			monster = PhotonNetwork.Instantiate("PurplePrefab", startingPosPlayer2, Quaternion.identity, 0);
		}
        //monster.GetComponent<myThirdPersonController>().isControllable = true;
        myPhotonView = monster.GetComponent<PhotonView>();
    }

    void OnGUI()
    {
		GUILayout.Label(PhotonNetwork.connectionStateDetailed.ToString());

		if(connected)
		{
			GUILayout.Label("Player " + playerID);
		}
		if (PhotonNetwork.connectionStateDetailed == PeerState.Joined)
		{
			bool shoutMarco = GameLogic.playerWhoIsIt == PhotonNetwork.player.ID;
			
			if (shoutMarco && GUILayout.Button("Marco!"))
			{
				myPhotonView.RPC("Marco", PhotonTargets.All);
			}
			if (!shoutMarco && GUILayout.Button("Polo!"))
			{
				myPhotonView.RPC("Polo", PhotonTargets.All);
			}
		}
	}
}
