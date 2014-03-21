using UnityEngine;


public class RandomMatchmaker : Photon.MonoBehaviour
{
    private PhotonView myPhotonView;
	private Vector3 startingPosPlayer1 = new Vector3(1450, 8, 560);
	private Vector3 startingPosPlayer2 = new Vector3(450, 5, 1500);
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

	}
}
