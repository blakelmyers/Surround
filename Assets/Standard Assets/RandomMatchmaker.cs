using UnityEngine;


public class RandomMatchmaker : Photon.MonoBehaviour
{
    private PhotonView myPhotonView;
	private Vector3 startingPosPlayer1 = new Vector3(1450, 8, 560);
	private Vector3 startingPosPlayer2 = new Vector3(740, 5, 1180);
	private int playerID;
	private bool connected = false;
	private bool waiting = false;
	private SelectionChoice selectionType;
	public string playerChoice;


	void Awake()
	{
		GameObject selection = GameObject.Find ("Selection");
		Debug.Log (selection.transform);
		DontDestroyOnLoad(selection); 
	}
    // Use this for initialization
    void Start()
    {
        PhotonNetwork.ConnectUsingSettings("0.1");
    }

    void OnJoinedLobby()
    {
        Debug.Log("JoinRandom");
        PhotonNetwork.JoinRandomRoom(null, 2);
    }

    void OnPhotonRandomJoinFailed()
    {
        PhotonNetwork.CreateRoom(null, true, true, 2);
    }

    void OnJoinedRoom()
    {
		playerID = PhotonNetwork.player.ID;
		selectionType = GameObject.Find("Selection").GetComponent<SelectionChoice>();


		switch(selectionType.selectionValue)
		{
		case DinosaurEnum.YellowTall:
			playerChoice = "YellowPrefab";
			break;
		case DinosaurEnum.RedTall:
			playerChoice = "RedPrefab";
			break;
		case DinosaurEnum.PurpleFat:
			playerChoice = "PurplePrefab";
			break;
		case DinosaurEnum.BlueFat:
			playerChoice = "BluePrefab";
			break;
		case DinosaurEnum.GreenFat:
			playerChoice = "GreenPrefab";
			break;
		case DinosaurEnum.OrangeTall:
			playerChoice = "OrangePrefab";
			break;
		}
		Debug.Log ("in room");
		Debug.Log (playerChoice);
		connected = true;

			GameObject monster;
			
		if(playerID == 1)  // Player 1
		{
			//waiting = true;

			monster = PhotonNetwork.Instantiate(playerChoice, startingPosPlayer1, Quaternion.identity, 0);
			myPhotonView = monster.GetComponent<PhotonView>();
		}
			 
		if(playerID == 2)
		{
				waiting = false;
				monster = PhotonNetwork.Instantiate(playerChoice, startingPosPlayer2, Quaternion.identity, 0);
				myPhotonView = monster.GetComponent<PhotonView>();
		}
 
    }

	void OnPhotonPlayerConnected(PhotonPlayer player)
	{
		if(player.ID == 2)
		{
			if(playerID == 1)  // Player 1 
			{   /*
				GameObject monster;
				monster = PhotonNetwork.Instantiate(playerChoice, startingPosPlayer1, Quaternion.identity, 0);
				monster.tag = "Red";
				myPhotonView = monster.GetComponent<PhotonView>();
*/
			}
		}
	}

    void OnGUI()
    {
		if (Application.loadedLevel != 1) {
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
