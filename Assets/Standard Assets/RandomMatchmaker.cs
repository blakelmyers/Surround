using UnityEngine;


public class RandomMatchmaker : Photon.MonoBehaviour
{
    private PhotonView myPhotonView;
	private Vector3 startingPosPlayer1 = new Vector3(1450, 8, 560);
	private Vector3 startingPosPlayer2 = new Vector3(450, 5, 1500);
	private int playerID;
	private bool connected = false;
	private bool waiting = false;

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
		playerID = PhotonNetwork.player.ID;

		connected = true;

			GameObject monster;
			
		if(playerID == 1)  // Player 1
		{
			waiting = true;
		}
			 
		if(playerID == 2)
			{
			waiting = false;
				monster = PhotonNetwork.Instantiate("PurplePrefab", startingPosPlayer2, Quaternion.identity, 0);
				myPhotonView = monster.GetComponent<PhotonView>();
			}
 
    }

	void OnPhotonPlayerConnected(PhotonPlayer player)
	{
		if(player.ID == 2)
		{
			if(playerID == 1)  // Player 1 
			{
				GameObject monster;
				monster = PhotonNetwork.Instantiate("YellowPrefab", startingPosPlayer1, Quaternion.identity, 0);
				myPhotonView = monster.GetComponent<PhotonView>();
			}
		}
	}

    void OnGUI()
    {
		if (Application.loadedLevel != 0) {
						if (GUILayout.Button ("Return to Main Menu")) {
								PhotonNetwork.LeaveRoom ();
								PhotonNetwork.Disconnect ();
								Application.LoadLevel ("MainMenu");
						}
						GUILayout.Label (PhotonNetwork.connectionStateDetailed.ToString ());

						if (connected) {
								GUILayout.Label ("Player " + playerID);
						}
			if (waiting) {
				GUILayout.Label ("Waiting on Player 2");
			}
		}


	}
}
