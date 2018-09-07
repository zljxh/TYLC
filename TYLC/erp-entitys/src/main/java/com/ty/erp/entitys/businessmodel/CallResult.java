package com.ty.erp.entitys.businessmodel;

/**
 * Created by admin on 2014/8/19.
 */
public class CallResult {

    public CallResult()
    {
        this.Result=true;
        setMessage("");
    }

    public boolean getResult() {
        return Result;
    }

    public void setResult(boolean result) {
        Result = result;
    }

    public    boolean Result;

    public String getMessage() {
        return Message;
    }

    public void setMessage(String message) {
        Message = message;
    }

    private  String Message;


    public Object geto() {
        return Obj;
    }

    public void seto(Object obj) {
        Obj = obj;
    }

    private  Object Obj;

    /**
     * 错误码，便于错误分类
     */
    private String ErrorCode;

    public String getErrorCode() {
        return ErrorCode;
    }

    public void setErrorCode(String errorCode) {
        ErrorCode = errorCode;
    }
}

