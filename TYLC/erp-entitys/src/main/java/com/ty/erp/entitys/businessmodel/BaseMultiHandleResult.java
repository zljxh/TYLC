package com.ty.erp.entitys.businessmodel;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by xyyz150 on 2015/2/28.
 */
public class BaseMultiHandleResult {

    public BaseMultiHandleResult() {
        DetailResultList = new ArrayList<BaseMultiHandleDetailResult>();
    }

    public void AddDetail(Long RowId, Boolean isSuccess) {
        BaseMultiHandleDetailResult detailResult = new BaseMultiHandleDetailResult();
        detailResult.setIsSuccess(isSuccess);
        detailResult.setRowId(RowId);
        DetailResultList.add(detailResult);
    }

    private Long TotalResults = 0L;

    private Long ErrorResults = 0L;

    //private List<String> ErrorMsg = Collections.synchronizedList(new ArrayList<String>());

    private List<String> ErrorMsg = new ArrayList<String>();

    private boolean IsSuccess;

    private String StringErrMsg;

    public Long getErrorResults() {
        return ErrorResults;
    }

    public void setErrorResults(Long errorResults) {
        ErrorResults = errorResults;
    }

    public Long getTotalResults() {
        return TotalResults;
    }

    public void setTotalResults(long totalResults) {
        this.TotalResults = totalResults;
    }

    public List<String> getErrorMsg() {
        return ErrorMsg;
    }

    public boolean getIsSuccess() {
        if (ErrorMsg == null || ErrorMsg.size() == 0) {
            return true;
        } else {
            return false;
        }
    }

    public void AddErrorMsg(String singlemsg) {
        ErrorMsg.add(singlemsg);
        ErrorResults = ErrorResults < 0 ? 1 : ErrorResults + 1;
    }

    public void AddErrCodeAndMsg(String errCode, String errMsg) {
    }

    public String getStringErrMsg() {
        if (ErrorMsg.size() <= 0) return "";
        StringBuilder stringBuilder = new StringBuilder();
        if (TotalResults > 0) {
            stringBuilder.append("共处理" + TotalResults + "条，失败" + ErrorResults + "条。错误原因：<br/>\n");
        } else {
            stringBuilder.append("操作失败，错误原因:<br/>");
        }
        for (String msg : ErrorMsg) {
            stringBuilder.append(msg + "<br/>");
        }
        return stringBuilder.toString();
    }

    public void setStringErrMsg(String msg) {
        StringErrMsg = msg;
    }

    public List<BaseMultiHandleDetailResult> getDetailResultList() {
        return DetailResultList;
    }

    public void setDetailResultList(List<BaseMultiHandleDetailResult> detailResultList) {
        this.DetailResultList = detailResultList;
    }

    private List<BaseMultiHandleDetailResult> DetailResultList;
}
