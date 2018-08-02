package com.qs.erp.utils.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

/**
 * Created by admin on 2014/10/30.
 */
public class DateHelp {
    static Date DefaultDate;

    public static Date getDefaultDate() {
        if (DefaultDate == null) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                DefaultDate = sdf.parse("1949-10-01 00:00:00");
            } catch (Exception ex) {
                throw new ServiceNoCheckException(ex);
            }
        }
        return DefaultDate;
    }

    /*
     * 时间转换为 yyyy-MM-dd 字符串
     * */
    public static String DateToStr(Date date) {
        if (date == null) return "";
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        String str = format.format(date);
        return str;
    }

    /*
     *
     * */
    public static String DateTString(Date time) {
        // Date d = new Date(time);
        if (time == null) return "";
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return formatter.format(time);
    }

    public static String DateToString(Date time, String format) {
        if (time == null) return "";
        SimpleDateFormat formatter = new SimpleDateFormat(format);
        return formatter.format(time);
    }

    public static Date ToDate(String time) {
        SimpleDateFormat formatter;
        formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;

        if (time == null)
            return date;

        if (StringHelp.IsNullOrEmpty(time)) {
            return date;
        }
        try {
            date = formatter.parse(time);
        } catch (Exception ex) {
            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("EEE MMM d HH:mm:ss 'CST' yyyy", Locale.ENGLISH);
                date = dateFormat.parse(time);
                dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                time = dateFormat.format(date);
            } catch (Exception e) {
            }
        }
        if (date != null)
            return date;


        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            date = sdf.parse(time);
        } catch (Exception ex) {
        }
        if (date == null) {
            SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy/MM/dd");
            try {
                date = sdf1.parse(time);
            } catch (Exception ex) {
                throw new ServiceNoCheckException(ex);
            }
        }
        return date;
    }

    /*
     * 时间添加固定时间，返回新时间
     * */
    public static Date addDate(Date d, long day) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        long time = d.getTime();
        day = day * 24 * 60 * 60 * 1000;
        time += day;
        try {
            String str = formatter.format(time);
            Date date = formatter.parse(str);
            return date;
        } catch (Exception ex) {
            throw new ServiceNoCheckException(ex);
        }

    }

    /*
     * 时间减去固定时间，返回新时间
     * */
    public static Date delDateHMS(Date d, long day) {
        Date now = null;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String s = sdf.format(d);
            now = sdf.parse(s);
        } catch (Exception ex) {
            throw new ServiceNoCheckException(ex);
        }
        long time = now.getTime();
        day = day * 24 * 60 * 60 * 1000;
        time -= day;
        return new Date(time);
    }

    /*
     * 时间减去固定时间，返回新时间
     * */
    public static Date delDateNoHMS(Date d, long day) {
        Date now = null;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            String s = sdf.format(d);
            now = sdf.parse(s);
        } catch (Exception ex) {
            throw new ServiceNoCheckException(ex);
        }
        long time = now.getTime();
        day = day * 24 * 60 * 60 * 1000;
        time -= day;
        return new Date(time);
    }

    /*
     * 时间减少月份，返回新时间
     * */
    public static Date delMonthNoHMS(Date d, int Num) {
        //得到一个Calendar的实例
        Calendar ca = Calendar.getInstance();
        ca.setTime(d);
        //设置当前时刻的时钟为0
        ca.set(Calendar.HOUR_OF_DAY, 0);
        //设置当前时刻的分钟为0
        ca.set(Calendar.MINUTE, 0);
        //设置当前时刻的秒钟为0
        ca.set(Calendar.SECOND, 0);
        //设置当前的毫秒钟为0
        ca.set(Calendar.MILLISECOND, 0);
        //减去Num个月份
        ca.add(Calendar.MONTH, -Num);
        Date delAfterMonth = ca.getTime();
        return delAfterMonth;
    }

    /**
     * 功能：当前时间增加分钟数。
     *
     * @param minutes 正值时时间延后，负值时时间提前。
     * @return Date
     * @author banzhao
     */
    public static Date addMinutes(Date date, int minutes) {
        if (minutes == 0) {
            return date;
        } else {
            Calendar c = Calendar.getInstance();
            c.setTime(date);
            c.set(Calendar.MINUTE, c.get(Calendar.MINUTE) + minutes);
            return new Date(c.getTimeInMillis());
        }
    }

    /*
     * 时间转换为年与日整数
     * */
    public static String DateToYMD(Date date) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        String dateString = formatter.format(date);
        return dateString;
    }

    public static String DateToYMDHMS(Date date) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String dateString = formatter.format(date);
        return dateString;
    }

    public static String DateToYMDHM(Date date) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmm");
        String dateString = formatter.format(date);
        return dateString;
    }

    /*
     * 时间转换为年与日整数
     * */
    public static String DateToYYYYMMDD(Date date) {
        SimpleDateFormat formatter = new SimpleDateFormat("YYYY-MM-dd");
        String dateString = formatter.format(date);
        return dateString;
    }

    public static Date getNow() {
        return new Date();
    }

    public static int getDiffHours(Date date1, Date date2) {
        long from = date1.getTime();
        long to = date2.getTime();
        int hours = (int) ((to - from) / (1000 * 60 * 60));
        return hours;
    }

    //判断2个时间间隔月份
    public static int getMonthSpace(Date date1, Date date2)
            throws ParseException {
        int result = 0;
        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();
        c1.setTime(date1);
        c2.setTime(date2);
        result = c2.get(Calendar.MONTH) - c1.get(Calendar.MONTH);
        int month = (c2.get(Calendar.YEAR) - c1.get(Calendar.YEAR)) * 12;
        return Math.abs(month + result);
    }
}

