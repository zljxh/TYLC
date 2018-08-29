package com.qs.erp.utils.util;


import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.CookieStore;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.cookie.Cookie;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.ContentBody;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;


public class HttpClientUtil {

    /**
     * 发送 get请求
     * 参考博客 http://blog.csdn.net/zmx729618/article/details/51799886
     *
     * @throws IOException
     * @throws ClientProtocolException
     */
    public static String get(String url) throws ClientProtocolException, IOException, ParseException {
        CloseableHttpClient httpclient = HttpClients.createDefault();

        try {
            // 创建httpget.
            HttpGet httpget = new HttpGet(url);
            //httpget.addHeader("Accept-Language:zh-CN", "zh;q=0.8");

            //setConnectTimeout：设置连接超时时间，单位毫秒。setConnectionRequestTimeout：设置从connect Manager获取Connection 超时时间，单位毫秒。这个属性是新加的属性，因为目前版本是可以共享连接池的。setSocketTimeout：请求获取数据的超时时间，单位毫秒。 如果访问一个接口，多少时间内无法返回数据，就直接放弃此次调用。
            RequestConfig defaultRequestConfig = RequestConfig.custom().setConnectTimeout(5000).setConnectionRequestTimeout(5000).setSocketTimeout(15000).build();
            httpget.setConfig(defaultRequestConfig);

            System.out.println("executing request " + httpget.getURI());

            // 执行get请求.
            CloseableHttpResponse response = httpclient.execute(httpget);

            System.out.println("got response");

            try {
                // 获取响应实体
                HttpEntity entity = response.getEntity();
                //System.out.println("--------------------------------------");
                // 打印响应状态
                //System.out.println(response.getStatusLine());
                if (entity != null) {
                    // 打印响应内容长度
                    //System.out.println("Response content length: " + entity.getContentLength());
                    // 打印响应内容
                    return EntityUtils.toString(entity, "utf-8");
                }
                //System.out.println("------------------------------------");
            } finally {
                response.close();
            }
        } finally {
            // 关闭连接,释放资源
            try {
                httpclient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public static String get(String url, int retry) throws ClientProtocolException, IOException, ParseException {
        Exception exp = null;
        for (int i = 0; i < retry; i++) {
            try {
                return get(url);
            } catch (ClientProtocolException e) {
                exp = e;
            } catch (IOException e) {
                exp = e;
            } catch (ParseException e) {
                exp = e;
            }
        }

        if (exp instanceof ClientProtocolException) {
            ClientProtocolException t = (ClientProtocolException) exp;
            throw t;
        } else if (exp instanceof IOException) {
            IOException t = (IOException) exp;
            throw t;
        } else {
            ParseException t = (ParseException) exp;
            throw t;
        }
    }

    public static String get(Map<String, String> header, String url, int retry) throws ClientProtocolException, IOException, ParseException {
        Exception exp = null;
        for (int i = 0; i < retry; i++) {
            try {
                return get(header, url);
            } catch (ClientProtocolException e) {
                exp = e;
            } catch (IOException e) {
                exp = e;
            } catch (ParseException e) {
                exp = e;
            }
        }

        if (exp instanceof ClientProtocolException) {
            ClientProtocolException t = (ClientProtocolException) exp;
            throw t;
        } else if (exp instanceof IOException) {
            IOException t = (IOException) exp;
            throw t;
        } else {
            ParseException t = (ParseException) exp;
            throw t;
        }
    }

    public static String get(Map<String, String> header, String url) throws ClientProtocolException, IOException, ParseException {

        CloseableHttpClient httpclient = HttpClients.createDefault();

        try {
            // 创建httpget.
            HttpGet httpget = new HttpGet(url);

            if (header != null) {
                for (Entry<String, String> param : header.entrySet()) {
                    httpget.addHeader(param.getKey(), param.getValue());
                }
            }

            //setConnectTimeout：设置连接超时时间，单位毫秒。setConnectionRequestTimeout：设置从connect Manager获取Connection 超时时间，单位毫秒。这个属性是新加的属性，因为目前版本是可以共享连接池的。setSocketTimeout：请求获取数据的超时时间，单位毫秒。 如果访问一个接口，多少时间内无法返回数据，就直接放弃此次调用。
            RequestConfig defaultRequestConfig = RequestConfig.custom().setConnectTimeout(5000).setConnectionRequestTimeout(5000).setSocketTimeout(15000).build();
            httpget.setConfig(defaultRequestConfig);

            System.out.println("executing request " + httpget.getURI());

            // 执行get请求.
            CloseableHttpResponse response = httpclient.execute(httpget);

            System.out.println("got response");

            try {
                // 获取响应实体
                HttpEntity entity = response.getEntity();
                //System.out.println("--------------------------------------");
                // 打印响应状态
                //System.out.println(response.getStatusLine());
                if (entity != null) {
                    // 打印响应内容长度
                    //System.out.println("Response content length: " + entity.getContentLength());
                    // 打印响应内容
                    return EntityUtils.toString(entity, "utf-8");
                }
                //System.out.println("------------------------------------");
            } finally {
                response.close();
            }
        } finally {
            // 关闭连接,释放资源
            try {
                httpclient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public static byte[] getBytes(String url, int retry) throws ClientProtocolException, IOException, ParseException {
        Exception exp = null;
        for (int i = 0; i < retry; i++) {
            try {
                return getBytes(url);
            } catch (ClientProtocolException e) {
                exp = e;
            } catch (IOException e) {
                exp = e;
            } catch (ParseException e) {
                exp = e;
            }
        }

        if (exp instanceof ClientProtocolException) {
            ClientProtocolException t = (ClientProtocolException) exp;
            throw t;
        } else if (exp instanceof IOException) {
            IOException t = (IOException) exp;
            throw t;
        } else {
            ParseException t = (ParseException) exp;
            throw t;
        }
    }

    public static byte[] getBytes(String url) throws ClientProtocolException, IOException, ParseException {
        CloseableHttpClient httpclient = HttpClients.createDefault();

        try {
            // 创建httpget.
            HttpGet httpget = new HttpGet(url);
            //httpget.addHeader("Accept-Language:zh-CN", "zh;q=0.8");

            //setConnectTimeout：设置连接超时时间，单位毫秒。setConnectionRequestTimeout：设置从connect Manager获取Connection 超时时间，单位毫秒。这个属性是新加的属性，因为目前版本是可以共享连接池的。setSocketTimeout：请求获取数据的超时时间，单位毫秒。 如果访问一个接口，多少时间内无法返回数据，就直接放弃此次调用。
            RequestConfig defaultRequestConfig = RequestConfig.custom().setConnectTimeout(5000).setConnectionRequestTimeout(5000).setSocketTimeout(15000).build();
            httpget.setConfig(defaultRequestConfig);

            System.out.println("executing request " + httpget.getURI());

            // 执行get请求.
            CloseableHttpResponse response = httpclient.execute(httpget);

            System.out.println("got response");

            try {
                // 获取响应实体
                HttpEntity entity = response.getEntity();
                //System.out.println("--------------------------------------");
                // 打印响应状态
                //System.out.println(response.getStatusLine());
                if (entity != null) {
                    // 打印响应内容长度
                    //System.out.println("Response content length: " + entity.getContentLength());
                    // 打印响应内容
                    return EntityUtils.toByteArray(entity);
                }
                //System.out.println("------------------------------------");
            } finally {
                response.close();
            }
        } finally {
            // 关闭连接,释放资源
            try {
                httpclient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }


    //调用示例

//    String url = "xxxxxxx";
//    String httpRes = null;
//    String localFileName = "E:/2.jpg";
//
//    Map<String,ContentBody> reqParam = new HashMap<String,ContentBody>();
//    reqParam.put("Filename", new StringBody(localFileName, ContentType.MULTIPART_FORM_DATA));
//    reqParam.put("pictitle", new StringBody(localFileName, ContentType.MULTIPART_FORM_DATA));
//    reqParam.put("dir", new StringBody("upload1", ContentType.MULTIPART_FORM_DATA));
//    reqParam.put("fileNameFormat", new StringBody("{time}{rand:6}", ContentType.MULTIPART_FORM_DATA));
//    reqParam.put("fileName", new StringBody(localFileName, ContentType.MULTIPART_FORM_DATA));
//    reqParam.put("fileName", new StringBody(localFileName, ContentType.MULTIPART_FORM_DATA));
//    reqParam.put("upfile", new FileBody(new File(fileLocation)));
//    reqParam.put("Upload", new StringBody("Submit Query", ContentType.MULTIPART_FORM_DATA));
//
//    httpRes = HttpClientUtil.postFileMultiPart(url,reqParam);


    public static Map<String, ContentBody> getReqParamToFileCenter(String categoryId,String tag,String description,String prefix, File file) {
        Map<String, ContentBody> reqParam = new HashMap<String, ContentBody>();
        reqParam.put("categoryId", new StringBody(categoryId, ContentType.MULTIPART_FORM_DATA));
        reqParam.put("tag", new StringBody(tag, ContentType.MULTIPART_FORM_DATA));
        reqParam.put("description", new StringBody(description, ContentType.MULTIPART_FORM_DATA));
        reqParam.put("prefix", new StringBody(prefix, ContentType.MULTIPART_FORM_DATA));
        reqParam.put("file", new FileBody(file));
        return reqParam;
    }

    public static <ReturnT> ReturnT postFileMultiPart(String url, Map<String, ContentBody> reqParam,Class<ReturnT> returnClass) throws Exception {
        return postFileMultiPart(null, url, reqParam,returnClass);
    }

    public static <ReturnT> ReturnT postFileMultiPart(Map<String, String> header, String url, Map<String, ContentBody> reqParam,Class<ReturnT> returnClass) throws Exception {
        CloseableHttpClient httpclient = HttpClients.createDefault();

        try {
            // 创建httpget.
            HttpPost httppost = new HttpPost(url);

            if (header != null) {
                for (Entry<String, String> param : header.entrySet()) {
                    httppost.addHeader(param.getKey(), param.getValue());
                }
            }

            //setConnectTimeout：设置连接超时时间，单位毫秒。setConnectionRequestTimeout：设置从connect Manager获取Connection 超时时间，单位毫秒。这个属性是新加的属性，因为目前版本是可以共享连接池的。setSocketTimeout：请求获取数据的超时时间，单位毫秒。 如果访问一个接口，多少时间内无法返回数据，就直接放弃此次调用。
            RequestConfig defaultRequestConfig = RequestConfig.custom().setConnectTimeout(5000).setConnectionRequestTimeout(5000).setSocketTimeout(15000).build();
            httppost.setConfig(defaultRequestConfig);

            System.out.println("executing request " + httppost.getURI());

            MultipartEntityBuilder multipartEntityBuilder = MultipartEntityBuilder.create();
            for (Entry<String, ContentBody> param : reqParam.entrySet()) {
                multipartEntityBuilder.addPart(param.getKey(), param.getValue());
            }
            HttpEntity reqEntity = multipartEntityBuilder.build();
            httppost.setEntity(reqEntity);

            // 执行post请求.
            CloseableHttpResponse response = httpclient.execute(httppost);

            System.out.println("got response");

            try {
                // 获取响应实体
                HttpEntity entity = response.getEntity();

                if (entity != null) {

                    String rep= EntityUtils.toString(entity, Charset.forName("UTF-8"));
                    if(returnClass==null){
                        return null;
                    }
                    return ConvertHelp.ToObjectFromJson(rep, returnClass);
                }

            } finally {
                response.close();

            }
        } finally {
            // 关闭连接,释放资源
            try {
                httpclient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public static String post(String url, Map<String, String> reqParam) throws ClientProtocolException, IOException {
        CloseableHttpClient httpclient = HttpClients.createDefault();

        try {
            // 创建httppost.
            HttpPost httppost = new HttpPost(url);

            //setConnectTimeout：设置连接超时时间，单位毫秒。setConnectionRequestTimeout：设置从connect Manager获取Connection 超时时间，单位毫秒。这个属性是新加的属性，因为目前版本是可以共享连接池的。setSocketTimeout：请求获取数据的超时时间，单位毫秒。 如果访问一个接口，多少时间内无法返回数据，就直接放弃此次调用。
            RequestConfig defaultRequestConfig = RequestConfig.custom().setConnectTimeout(5000).setConnectionRequestTimeout(5000).setSocketTimeout(15000).build();
            httppost.setConfig(defaultRequestConfig);

            System.out.println("executing request " + httppost.getURI());

            //装填参数
            List<NameValuePair> nvps = new ArrayList<NameValuePair>();
            if (reqParam != null) {
                for (Entry<String, String> entry : reqParam.entrySet()) {
                    nvps.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
                }
            }
            UrlEncodedFormEntity reqEntity = new UrlEncodedFormEntity(nvps, "utf-8");
            httppost.setEntity(reqEntity);

            // 执行post请求.
            CloseableHttpResponse response = httpclient.execute(httppost);

            System.out.println("got response");

            try {
                // 获取响应实体
                HttpEntity entity = response.getEntity();
                //System.out.println("--------------------------------------");
                // 打印响应状态
                //System.out.println(response.getStatusLine());
                if (entity != null) {
                    // 打印响应内容长度
                    //System.out.println("Response content length: " + entity.getContentLength());
                    // 打印响应内容
                    return EntityUtils.toString(entity, Charset.forName("UTF-8"));
                }
                //System.out.println("------------------------------------");
            } finally {
                response.close();

            }
        } finally {
            // 关闭连接,释放资源
            try {
                httpclient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }


}
