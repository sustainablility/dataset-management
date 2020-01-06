# dataset-management
###API: 
<hr>
GET: /verifyDatasetTokenAndDatasetName <br>
Parameters in URLencode: <br>
- token : Dataset Token of user <br>
- name : Dataset Name
<hr>
POST: /newDatasetRecord <br>
JSON format <br>
Parameters: <br>
{
	"datasetName": "",
	"datasetPublicity":"" ,
	"datasetMetaData": "",
	"datasetOwnerList": "",
	"datasetAdminList": ""
}
<br>
All parameters should be encrypted. 
<br>
Response text of "0" means ok. 