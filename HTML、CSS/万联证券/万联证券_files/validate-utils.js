/*-------------------------------------------------------------
 描述:
 	  验证客户端输入数据

 使用说明:
     使用前必须引用jquery.js

 使用示例:
	  var strMsg = "";
	  strMsg += $("input[@name='userName']").checkValid("姓名","NotEmpty");
	  if(!isEmpty(strMsg))
	  {
		 alert(strMsg);
         return false;
	  }
	  else
	  {
    	 return true;
	  }

 修改纪录：
	  修改时间:2009.03.10
	  修改人:李炜  
	  修改说明:修改了对jquery的支持,
              修改了部分正则表达式对firefox的不兼容的BUG,
              增加了身份证验证功能,
              增加了字符串长度比较功能,
              增加了两个字符串比较功能.
               

*------------------------------------------------------------*/
/**
 * 执行正则表达式
 * @param re 匹配的正则表达式
 * @para s 匹配的字符串
 */
function executeExp(re, s)
{
    return re.test(s);
}

/**
 * 判断字符串是否为空
 * @param strValue 字符串
 */
function isEmpty(strValue)
{
	strValue = jQuery.trim(strValue);
	return strValue.length == 0;
}

/**
 * 判断是否是正确的日期,正确格式为:yyyy-mm-dd
 * @param strValue 日期字符串
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

//长时间，形如 (2003-12-05 13:04:06)
function isDateTime(str)
{
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
	var r = str.match(reg); 
	if(r==null) return false; 
	var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]); 
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);
}

/**
 * 判断字符串是否为字母或数字
 * @param strValue 
 */
function isAlphaNumeric(strValue)
{
	if(isEmpty(strValue))
		return false;
    // 只能是 A-Z a-z 0-9 之间的字母数字 或者为空
	var pattern = /^[A-Za-z0-9]+$/;
    return executeExp(pattern, strValue);
}

/**
* 判断是否为中文、英文、字母或_
*/
function isCnAndEnNumeric(strValue)
{
	var  pattern = /^[_0-9a-zA-Z\u4e00-\u9fa5]+$/;  
	return executeExp(pattern, strValue);
}

/**
* 判断是否为英文、字母或_
*/
function isEnNumeric(strValue)
{
	var  pattern = /^[_0-9a-zA-Z]+$/;  
	return executeExp(pattern, strValue);
}

/**
	判断是否为中文
**/
function isCnAndEn(strValue)
{
	if (isEmpty(strValue))
		return false;
	
	var pattern = /^[u4E00-u9FA5]+$/;
	
	return executeExp(pattern, strValue);
}

/**
 * 判断是否是正确的Email
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
 * 判断是否是货币
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
 * 判断是否为数字
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
 * 判断是否为浮点数（不带正负号）
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
 * 判断是否为手机号码
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
 * 判断是否为电话
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
 * 判断是否为固话
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
 * 判断是否为邮政编码
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
 * 判断是否为合法的URL
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
 * 验证身份证的有效性
 * @param objName 身份证ID
 */
function isCardID(strValue)
{
	
	if(isEmpty(strValue))
	{
		return false;	
	}

	//如果身份证的长度不合法，15位或18位
	if(!((strValue.length == 15) || (strValue.length == 18)))
	{
		//strMsg = "【身份证】 长度错误，请输入15位或者18位有效位数！\n";
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
			//strMsg = "【身份证】 出生日期非法，请输入正确的日期！\n";
			return false;
		}
		else
		{
			var month = 0;			
			if(strValue.length == 15) month = strValue.substr(8,2);
			if(strValue.length == 18) month = strValue.substr(10,2);
			if((month < 1)||(month > 12))
			{					
				//strMsg = "【身份证】 出生日期非法，请输入正确的日期！\n";
				return false;
			}
			else
			{
				var day = 0;
				if(strValue.length == 15) day = strValue.substr(10,2);
				if(strValue.length == 18) day = strValue.substr(12,2);
				if((day < 1)||(day > 31))
				{				
					//strMsg = "【身份证】 出生日期非法，请输入正确的日期！\n";
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
				case "NotEmpty":      // 不许空值
					if(isEmpty(strValue))
						strMsg = '【' + strDescription + '】 不能为空！\n';
				break;
				case "Date":          //判断是否是日期
					if(!isDate(strValue))
						strMsg = '【' + strDescription + '】 格式错误，请输入正确的日期格式！\n';
				break;
				case "AlphaNumeric":  //字母数字
					if (!isAlphaNumeric(strValue))
						strMsg = '【' + strDescription + '】 格式错误，请输入字母或数字！\n';
				break;
				case "Email":         // 电子邮件
					if (!isEmail(strValue))
						strMsg = '【' + strDescription + '】 格式错误，请输入正确的邮件格式！\n';
				break;
				case "Money":         //货币
					if (!isMoney(strValue))
						strMsg = '【' + strDescription + '】 格式错误，请输入正确的货币格式！\n';
				break;
				case "Numeric" :      //数字
					if (!isNumeric(strValue))
						strMsg = '【' + strDescription + '】 格式错误，请输入数字！\n';
				break;
				case "NumberFloat":   //浮点数
					if (!isNumberFloat(strValue))
						strMsg = '【' + strDescription + '】 格式错误，请输入浮点数！\n';
				break;
				case "Mobile":        // 手机号码
					if (!isMobile(strValue))
						strMsg = '【' + strDescription + '】 格式错误，请输入正确的手机号码！\n';
				break;
				case "Phone":        // 电话
					if (!isPhone(strValue))
						strMsg = '【' + strDescription + '】 格式错误，请输入正确的电话格式！\n';
				break;
				case "Tel":        // 固话
					if (!isTel(strValue))
						strMsg = '【' + strDescription + '】 格式错误，请输入正确的电话格式！\n';
				break;
				case "PostalCode":    // 邮政编码
					if (!isPostalCode(strValue))
						strMsg = '【' + strDescription + '】 格式错误，请输入6位数字！\n';
				break;
				case "URL":          //URL
					if (!isURL(strValue))
						strMsg = '【' + strDescription + '】 格式错误，请输入正确的URL格式！\n';
				break;
				case "CardID":      //身份证号
					if (!isCardID(strValue))
						strMsg = '【' + strDescription + '】 格式错误，请输入正确的身份证号码！\n';
				break;
				default:            //其他
					strMsg = '错误的 【' + strDescription + '】 类型 "' + strType + '" 不能识别！\n';
				break;
			}
		}
		else
		{
			 strMsg = '【' + strDescription + "】 对象不存在！\n";
		}
		return strMsg;
	}
});