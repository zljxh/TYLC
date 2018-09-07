package com.ty.erp.utils.util;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by xyyz150 on 2014/11/17.
 */
public class StringHelp {
    public static boolean StringIsNullOrEmpty(String str) {
        if (str == null) return true;
        if (str.isEmpty()) return true;
        return false;
    }

    public static boolean IsNullOrEmpty(String str) {
        if (str == null) return true;
        if (str.trim().isEmpty()) return true;

        return false;
    }

    public static boolean SearchIsContain(String searchStr, List<String> list) {
        if (list == null) return false;
        for (String str : list) {
            if (searchStr.indexOf(str) > -1) {
                return true;
            }
        }
        return false;
    }

    public static void RemoveEmpty(List<String> list) {
        boolean result = true;
        while (result) {
            result = list.remove("");
        }
    }

    /*
    * 一个字符如果长度不够，在左边补上相应个字符
    * */
    public static String PadLeft(String str, int length, char c) {
        if (length <= 0)
            return str;
        int strLength = 0;
        if (!IsNullOrEmpty(str)) {
            strLength = str.length();
        }
        if (strLength >= length)
            return str;
        while (str.length() < length)
            str = c + str;
        return str;
    }

    /*
    * 字符串必须全部是数字
    * */
    public static boolean IsNum(String str) {
        Pattern pattern = Pattern.compile("[0-9]*");
        Matcher isNum = pattern.matcher(str);
        if (!isNum.matches()) {
            return false;
        }
        return true;
    }

    public static boolean IsLetterORNumber(String str) {
        Pattern pattern = Pattern.compile("^(([a-z]|\\d)*)$");
        Matcher isNum = pattern.matcher(str);
        if (!isNum.matches()) {
            return false;
        }
        return true;
    }

    public static String InterceptStr(String str, int length) {
        if (str == null)
            return "";
        if (str.length() <= length)
            return str;
        return str.substring(0, length);

    }

    /**
     * @param text   目标字符串
     * @param length 截取长度
     * @param encode 采用的编码方式
     * @return
     */
    /*public static String substring(String text, int length, String encode)throws UnsupportedEncodingException{
        if (text == null) {
            return null;
        }
        StringBuilder sb = new StringBuilder();
        int currentLength = 0;
        for (char c : text.toCharArray()) {
            currentLength += String.valueOf(c).getBytes(encode).length;
            if (currentLength <= length) {
                sb.append(c);
            } else {
                break;
            }
        }
        return sb.toString();

    }*/
    public static String subString(String message, int length) {
        if (StringIsNullOrEmpty(message))
            return "";
        if (message.length() > length)
            return message.substring(0, length);
        return message;
    }

    /*public static String filterEmoji(String source) {
        if (source != null) {
            Pattern emoji = Pattern.compile("[\ud83c\udc00-\ud83c\udfff]|[\ud83d\udc00-\ud83d\udfff]|[\u2600-\u27ff]|[\uD83E\uDDC0]|[\uD83C\uDF80\uD83C\uDF3B\uD83E\uDD81]", Pattern.UNICODE_CASE | Pattern.CASE_INSENSITIVE);
            Matcher emojiMatcher = emoji.matcher(source);
            if (emojiMatcher.find()) {
                source = emojiMatcher.replaceAll("*");
                return source;
            }
            return source;
        }
        return source;
    }*/

    public static boolean isMobile(String str) {
        Pattern p = null;
        Matcher m = null;
        boolean b = false;
        p = Pattern.compile("^[1][3,4,5,7,8][0-9]{9}$"); // 验证手机号
        m = p.matcher(str);
        b = m.matches();
        return b;
    }

    public static boolean isNullOrEmpty(Object str) {
        if (str == null) return true;
        if (str.toString().trim().isEmpty()) return true;

        return false;
    }


    /**
     * 判断字符串是否包含中文
     *
     * @param str
     * @return
     */
    public static boolean isContainChinese(String str) {
        Pattern p = Pattern.compile("[\u4e00-\u9fa5]");
        Matcher m = p.matcher(str);
        if (m.find()) {
            return true;
        }
        return false;
    }

    //截取数字
    public static String getNumbers(String content) {
        StringBuffer str1 = new StringBuffer(content);
        str1.reverse();
        StringBuffer str2 = new StringBuffer();
        if (str1 != null && !"".equals(str1.toString())) {
            for (int i = 0; i < str1.length(); i++) {
                if (str1.charAt(i) >= 48 && str1.charAt(i) <= 57) {
                    str2.append(str1.charAt(i));
                } else {
                    break;
                }
            }
        }
        str2.reverse();
        return str2.toString();
    }

    public static String replaceBlank(String str) {
        String dest = "";
        if (str!=null) {
            Pattern p = Pattern.compile("\\s*|\t|\r|\n");
            Matcher m = p.matcher(str);
            dest = m.replaceAll("");
        }
        return dest;
    }

    public static String getTel(String tel){
        if (tel==null)return "";
        tel=tel.replaceAll(" ","");
        if (tel.length()<=11)return tel;
        return tel.substring(0,11);
    }

    public static String getMoble(String mobel){
        if (mobel==null)return "";
        mobel=mobel.replaceAll(" ","");
        if (mobel.length()<=12)return mobel;
        return mobel.substring(0,12);
    }
}
