using UnityEngine;

public class NetworkCharacter : Photon.MonoBehaviour
{
    private Vector3 correctPlayerPos = Vector3.zero; // We lerp towards this
    private Quaternion correctPlayerRot = Quaternion.identity; // We lerp towards this
    // Update is called once per frame
    void Update()
    {
		Debug.Log ("in serialize");
        if (!photonView.isMine)
        {
            transform.position = Vector3.Lerp(transform.position, this.correctPlayerPos, Time.deltaTime * 5);
            transform.rotation = Quaternion.Lerp(transform.rotation, this.correctPlayerRot, Time.deltaTime * 5);
        }
    }

    void OnPhotonSerializeView(PhotonStream stream, PhotonMessageInfo info)
    {
		Debug.Log ("in serialize");
        if (stream.isWriting)
        {
			Debug.Log("writting data");
            // We own this player: send the others our data
            stream.SendNext(transform.position);
            stream.SendNext(transform.rotation);

           // myThirdPersonController myC = GetComponent<myThirdPersonController>();
            //stream.SendNext((int)myC._characterState);
        }
        else
        {
			Debug.Log("getting data");
            // Network player, receive data
            this.correctPlayerPos = (Vector3)stream.ReceiveNext();
            this.correctPlayerRot = (Quaternion)stream.ReceiveNext();

            //myThirdPersonController myC = GetComponent<myThirdPersonController>();
            //myC._characterState = (CharacterState)stream.ReceiveNext();
        }
    }
}
