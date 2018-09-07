package com.ty.erp.utils.util;

/**
 * Created by xyyz150 on 2016/9/6.
 */
public class ServiceNoCheckException extends RuntimeException {
    public ServiceNoCheckException(String message) {
        super(message);
    }

    public ServiceNoCheckException(String message, Throwable cause) {
        super(message, cause);
    }

    public ServiceNoCheckException(Throwable cause) {
        super(cause);
    }

    protected ServiceNoCheckException(String message, Throwable cause,
                                      boolean enableSuppression,
                                      boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    @Override
    public String toString() {
        StringBuffer sb = new StringBuffer();
        String s = getClass().getName();
        String message = getLocalizedMessage();
        sb.append((message != null) ? (s + ": " + message) : s);
        Throwable cause = getCause();
        while (cause != null) {
            if (!cause.getClass().getName().equalsIgnoreCase(s)) {
                sb.append("\n原异常:").append(cause.toString());
                StackTraceElement[] stackTraces = cause.getStackTrace();
                if (stackTraces != null && stackTraces.length > 0) {
                    for (StackTraceElement stackTrace : stackTraces) {
                        sb.append("\n").append(stackTrace.toString());
                    }
                }
                cause = cause.getCause();
            } else {
                break;
            }
        }
        return sb.toString();
    }
}
