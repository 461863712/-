/*-------------------------------------------------------------
 ����:
 	  ��֤�ͻ�����������

 ʹ��˵��:
     ʹ��ǰ��������jquery.js

 ʹ��ʾ��:
	  var strMsg = "";
	  strMsg += $("input[@name='userName']").checkValid("����","NotEmpty");
	  if(!isEmpty(strMsg))
	  {
		 alert(strMsg);
         return false;
	  }
	  else
	  {
    	 return true;
	  }

 �޸ļ�¼��
	  �޸�ʱ��:2009.03.10
	  �޸���:���  
	  �޸�˵��:�޸��˶�jquery��֧��,
              �޸��˲���������ʽ��firefox�Ĳ����ݵ�BUG,
              ���������֤��֤����,
              �������ַ������ȱȽϹ���,
              �����������ַ����ȽϹ���.
               

*------------------------------------------------------------*/
/**
 * ִ��������ʽ
 * @param re ƥ���������ʽ
 * @para s ƥ����ַ���
 */
function executeExp(re, s)
{
    return re.test(s);
}

/**
 * �ж��ַ����Ƿ�Ϊ��
 * @param strValue �ַ���
 */
function isEmpty(strValue)
{
	strValue = jQuery.trim(strValue);
	return strValue.length == 0;
}

/**
 * �ж��Ƿ�����ȷ������,��ȷ��ʽΪ:yyyy-mm-dd
 * @param strValue �����ַ���
 */
function isDate(strValue)
{
	if(isEmpty(strValue))
		return false;
	var r = strValue.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
	if(r==null)
		return false; 
	var d= new Date(r[1], r[3]-1, r[4]); 
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);	
}

//��ʱ�䣬���� (2003-12-05 13:04:06)
function isDateTime(str)
{
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
	var r = str.match(reg); 
	if(r==null) return false; 
	var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]); 
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);
}

/**
 * �ж��ַ����Ƿ�Ϊ��ĸ������
 * @param strValue 
 */
function isAlphaNumeric(strValue)
{
	if(isEmpty(strValue))
		return false;
    // ֻ���� A-Z a-z 0-9 ֮�����ĸ���� ����Ϊ��
	var pattern = /^[A-Za-z0-9]+$/;
    return executeExp(pattern, strValue);
}

/**
* �ж��Ƿ�Ϊ���ġ�Ӣ�ġ���ĸ��_
*/
function isCnAndEnNumeric(strValue)
{
	var  pattern = /^[_0-9a-zA-Z\u4e00-\u9fa5]+$/;  
	return executeExp(pattern, strValue);
}

/**
* �ж��Ƿ�ΪӢ�ġ���ĸ��_
*/
function isEnNumeric(strValue)
{
	var  pattern = /^[_0-9a-zA-Z]+$/;  
	return executeExp(pattern, strValue);
}

/**
	�ж��Ƿ�Ϊ����
**/
function isCnAndEn(strValue)
{
	if (isEmpty(strValue))
		return false;
	
	var pattern = /^[u4E00-u9FA5]+$/;
	
	return executeExp(pattern, strValue);
}

/**
 * �ж��Ƿ�����ȷ��Email
 * @param strValue
 */
function isEmail(strValue)
{
	if(isEmpty(strValue))
		return false;
    var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    return executeExp(pattern, strValue);
}

/**
 * �ж��Ƿ��ǻ���
 * @param strValue
 */
function isMoney(strValue)
{
	if(isEmpty(strValue))
		return false;
	var pattern = /^[+-]?\d+(,\d{3})*(\.\d+)?$/;
    return executeExp(pattern, strValue);
}

/**
 * �ж��Ƿ�Ϊ����
 * @param strValue
 */
function isNumeric(strValue)
{
	if (isEmpty(strValue))
		return false;
	var pattern = /^[0-9]*$/;
    return executeExp(pattern, strValue);
}

/**
 * �ж��Ƿ�Ϊ�����������������ţ�
 * @param strValue
 */
function isNumberFloat(strValue)
{
	if (isEmpty(strValue)) 
		return false;
	var pattern = /^\d+(\.\d+)?$/;
    return executeExp(pattern, strValue);
}

/**
 * �ж��Ƿ�Ϊ�ֻ�����
 * @param strValue
 */
function isMobile(strValue)
{
	if (isEmpty(strValue))
		return false;
	var pattern = /^(1)[0-9]{10}$/;
    return executeExp(pattern, strValue);
}


/**
 * �ж��Ƿ�Ϊ�绰
 * @param strValue
 */
function isPhone(strValue)
{
	if (isEmpty(strValue)) 
		return false;
	var pattern = /(^\(\d{3,5}\)\d{6,8}(-\d{2,8})?$)|(^\d+-\d+$)|(^(13|15|18)[0-9]{9}$)/;
    return executeExp(pattern, strValue );
}

/**
 * �ж��Ƿ�Ϊ�̻�
 * @param strValue
 */
function isTel(strValue)
{
	if (isEmpty(strValue)) 
		return false;
	var pattern = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    return executeExp(pattern, strValue );
}

/**
 * �ж��Ƿ�Ϊ��������
 * @param strValue
 */
function isPostalCode(strValue)
{
	if (isEmpty(strValue)) 
		return false;
	var pattern = /(^\d{6}$)/;
   	return executeExp(pattern, strValue)
}

/**
 * �ж��Ƿ�Ϊ�Ϸ���URL
 * @param strValue
 */
function isURL(strValue)
{
	if (isEmpty(strValue)) 
		return false;
    var pattern = /^(http|https|ftp):\/\/(\w+\.)+[a-z]{2,3}(\/\w+)*(\/\w+\.\w+)*(\?\w+=\w*(&\w+=\w*)*)*/;
    return executeExp(pattern, strValue);
}

/**
 * ��֤���֤����Ч��
 * @param objName ���֤ID
 */
function isCardID(strValue)
{
	
	if(isEmpty(strValue))
	{
		return false;	
	}

	//������֤�ĳ��Ȳ��Ϸ���15λ��18λ
	if(!((strValue.length == 15) || (strValue.length == 18)))
	{
		//strMsg = "�����֤�� ���ȴ���������15λ����18λ��Чλ����\n";
		return false;
	}
	else
	{
		var year;
		if(strValue.length == 15)
		{
			year = parseInt(strValue.substr(6,2)) + 1900;
		}
		else if(strValue.length == 18)
		{
			year = parseInt(strValue.substr(6,4))
		}
		else
		{
			year = 0;
		}
		if((year < 1900) || (year > (new Date()).getFullYear() ))
		{			
			//strMsg = "�����֤�� �������ڷǷ�����������ȷ�����ڣ�\n";
			return false;
		}
		else
		{
			var month = 0;			
			if(strValue.length == 15) month = strValue.substr(8,2);
			if(strValue.length == 18) month = strValue.substr(10,2);
			if((month < 1)||(month > 12))
			{					
				//strMsg = "�����֤�� �������ڷǷ�����������ȷ�����ڣ�\n";
				return false;
			}
			else
			{
				var day = 0;
				if(strValue.length == 15) day = strValue.substr(10,2);
				if(strValue.length == 18) day = strValue.substr(12,2);
				if((day < 1)||(day > 31))
				{				
					//strMsg = "�����֤�� �������ڷǷ�����������ȷ�����ڣ�\n";
					return false;
				}
			}
		}

	}
	return true;
}

jQuery.fn.extend({
	checkValid:function(strDescription, strType)
	{
		var strValue = $(this).val();
		var strMsg = "";
		if(this.length > 0)
		{
			switch(strType)
			{
				case "NotEmpty":      // �����ֵ
					if(isEmpty(strValue))
						strMsg = '��' + strDescription + '�� ����Ϊ�գ�\n';
				break;
				case "Date":          //�ж��Ƿ�������
					if(!isDate(strValue))
						strMsg = '��' + strDescription + '�� ��ʽ������������ȷ�����ڸ�ʽ��\n';
				break;
				case "AlphaNumeric":  //��ĸ����
					if (!isAlphaNumeric(strValue))
						strMsg = '��' + strDescription + '�� ��ʽ������������ĸ�����֣�\n';
				break;
				case "Email":         // �����ʼ�
					if (!isEmail(strValue))
						strMsg = '��' + strDescription + '�� ��ʽ������������ȷ���ʼ���ʽ��\n';
				break;
				case "Money":         //����
					if (!isMoney(strValue))
						strMsg = '��' + strDescription + '�� ��ʽ������������ȷ�Ļ��Ҹ�ʽ��\n';
				break;
				case "Numeric" :      //����
					if (!isNumeric(strValue))
						strMsg = '��' + strDescription + '�� ��ʽ�������������֣�\n';
				break;
				case "NumberFloat":   //������
					if (!isNumberFloat(strValue))
						strMsg = '��' + strDescription + '�� ��ʽ���������븡������\n';
				break;
				case "Mobile":        // �ֻ�����
					if (!isMobile(strValue))
						strMsg = '��' + strDescription + '�� ��ʽ������������ȷ���ֻ����룡\n';
				break;
				case "Phone":        // �绰
					if (!isPhone(strValue))
						strMsg = '��' + strDescription + '�� ��ʽ������������ȷ�ĵ绰��ʽ��\n';
				break;
				case "Tel":        // �̻�
					if (!isTel(strValue))
						strMsg = '��' + strDescription + '�� ��ʽ������������ȷ�ĵ绰��ʽ��\n';
				break;
				case "PostalCode":    // ��������
					if (!isPostalCode(strValue))
						strMsg = '��' + strDescription + '�� ��ʽ����������6λ���֣�\n';
				break;
				case "URL":          //URL
					if (!isURL(strValue))
						strMsg = '��' + strDescription + '�� ��ʽ������������ȷ��URL��ʽ��\n';
				break;
				case "CardID":      //���֤��
					if (!isCardID(strValue))
						strMsg = '��' + strDescription + '�� ��ʽ������������ȷ�����֤���룡\n';
				break;
				default:            //����
					strMsg = '����� ��' + strDescription + '�� ���� "' + strType + '" ����ʶ��\n';
				break;
			}
		}
		else
		{
			 strMsg = '��' + strDescription + "�� ���󲻴��ڣ�\n";
		}
		return strMsg;
	}
});