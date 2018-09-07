package com.ty.erp.utils.util;

import java.lang.reflect.Method;
import java.util.*;

/**
 * Created by admin on 2014/12/4.
 */
public class ListHelp {
    public static <T, TTarget> List<T> getSourceListExistsTarget(List<T> sourceList, List<TTarget> targetList, ListEquals<T, TTarget> listequals) {
        List<T> list = new ArrayList<T>();
        for (T source : sourceList) {
            for (TTarget target : targetList) {
                if (listequals.equals(source, target)) {
                    list.add(source);
                    break;
                }
            }
        }
        return list;
    }

    public static <T, TTarget> boolean Exists(List<T> list, TTarget t, ListEquals<T, TTarget> equals) {
        if (list == null || list.size() == 0) return false;
        for (T source : list) {
            if (equals.equals(source, t)) {
                return true;
            }
        }
        return false;
    }

    public static <T, TTarget> List<T> getSourceListNotExistsTarget(List<T> sourceList, List<TTarget> targetList, ListEquals<T, TTarget> listequals) {
        List<T> list = new ArrayList<T>();
        boolean exists = false;
        for (T source : sourceList) {
            exists = false;
            for (TTarget target : targetList) {
                if (listequals.equals(source, target)) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                list.add(source);
            }
        }
        return list;
    }

    public static <T, TReturn> List<TReturn> getTReturnList(List<T> sourceList, ListGetTReturn<T, TReturn> getTReturn) {
        List<TReturn> list = new ArrayList<TReturn>();
        for (T t : sourceList) {
            TReturn ret = getTReturn.getReturnT(t);
            if (ret != null) {
                list.add(ret);
            }
        }
        return list;
    }

    public static <T, TReturn> List<TReturn> getListByFN(List<T> sourceList, ListGetTReturn<T, TReturn> getTReturn) {
        List<TReturn> list = new ArrayList<TReturn>();
        for (T t : sourceList) {
            TReturn ret = getTReturn.getReturnT(t);
            if (ret != null) {
                list.add(ret);
            }
        }
        return list;
    }

    public static <K, T> Map<K, List<T>> GroupBy(List<T> sourceList, ListGroupBy<T, K> gb) {
        Map<K, List<T>> map = new HashMap<K, List<T>>();
        if (sourceList == null) return map;
        if (gb == null) return map;
        for (T item : sourceList) {
            K key = gb.GroupBy(item);
            if (map.containsKey(key)) {
                map.get(key).add(item);
            } else {
                List<T> list = new ArrayList<T>();
                list.add(item);
                map.put(key, list);
            }
        }
        return map;
    }

    public static <T> List<T> concat(List<T> sourceList, List<T> targetList, ListEquals<T, T> equals) {
        List<T> list = getSourceListNotExistsTarget(sourceList, targetList, equals);
        list.addAll(targetList);
        return list;
    }

    public static <T> List<T> distinct(List<T> sourceList, ListEquals<T, T> equals) {
        List<T> list = new ArrayList<T>();
        for (T t : sourceList) {
            if (!Exists(list, t, equals)) {
                list.add(t);
            }
        }
        return list;
    }

    public static boolean IsNullOrEmpty(List list) {
        if (list == null) return true;
        if (list.size() == 0) return true;
        return false;
    }

    public static <T> Long SumLong(List<T> sourceList, ListGet<T, Long> get) {
        Long ret = 0L;
        if (sourceList == null) return ret;
        if (get == null) return ret;
        for (T item : sourceList) {
            ret += get.Get(item);
        }
        return ret;
    }

    public static <T, Target> T Frist(List<T> sourceList, Target tar, ListFilter<T, Target> select) {
        if (sourceList == null) return null;
        if (select == null) return null;
        for (T item : sourceList) {
            if (select.Select(item, tar)) {
                return item;
            }
        }
        return null;
    }

    public static <T> String Join(List<T> sourceList, ListGet<T, String> get) {
        StringBuffer str = new StringBuffer();
        if (sourceList == null) return str.toString();
        if (get == null) return str.toString();
        for (T item : sourceList) {
            str.append(get.Get(item));
        }
        return str.toString();
    }

    public static <T> Double SumDouble(List<T> sourceList, ListGet<T, Double> get) {
        Double ret = 0D;
        if (sourceList == null) return ret;
        if (get == null) return ret;
        for (T item : sourceList) {
            ret += get.Get(item);
        }
        return ret;
    }

    public static <T, Target> List<T> Where(List<T> sourceList, Target tar, ListFilter<T, Target> select) {
        List<T> list = new ArrayList<T>();
        if (sourceList == null) return list;
        if (select == null) return list;
        for (T item : sourceList) {
            if (select.Select(item, tar)) {
                list.add(item);
            }
        }
        return list;
    }

    public static <T, Target> void Remove(List<T> sourceList, Target tar, ListEquals<T, Target> equals) {
        List<T> list = new ArrayList<T>();
        if (sourceList == null) return;
        if (equals == null) return;
        for (T source : sourceList) {
            if (equals.equals(source, tar)) {
                list.add(source);
            }
        }
        sourceList.removeAll(list);
    }

    public static int ComparatorSkuRowId(Object o1, Object o2) {
        return ((Long) o1).compareTo((Long) o2);
    }

    /**
     * 反射方式排序list，若出现异常，可能出现无法正确排序
     * 返回排序成功/失败
     *
     * @param list
     * @param skuRowIdGetterName
     * @param <T>
     * @return
     * @throws Exception
     */
    public static <T> boolean ComparatorSkuRowId(List<T> list, String skuRowIdGetterName) throws Exception {
        final Method method = list.get(0).getClass().getMethod(skuRowIdGetterName, new Class[]{});
        final BooleanWarp isSuccess = new BooleanWarp(true);
        Collections.sort(list, new Comparator<T>() {
            @Override
            public int compare(T o1, T o2) {
                try {
                    return ((Long) method.invoke(o1, new Object[]{})).compareTo((Long) method.invoke(o2, new Object[]{}));
                } catch (Exception e) {
                    throw new ServiceNoCheckException(e);
                    /*isSuccess.setIsSuccess(false);
                    return 0;*/
                }
            }
        });
        return isSuccess.getIsSuccess();
    }

    public static <T> boolean SortMapListWithSpecifyKey(List<Map<String, Object>> list, String sortKey) throws Exception {
        final String sortKey_final = sortKey;
        final BooleanWarp isSuccess = new BooleanWarp(true);
        Collections.sort(list, new Comparator<Map<String, Object>>() {
            @Override
            public int compare(Map<String, Object> o1, Map<String, Object> o2) {
                //升序
                try {
                    return ConvertHelp.ToString(o1.get(sortKey_final)).compareTo(ConvertHelp.ToString(o2.get(sortKey_final)));
                } catch (Exception e) {
                    throw new ServiceNoCheckException(e);
                    /*isSuccess.setIsSuccess(false);
                    return 0;*/
                }
            }
        });
        return isSuccess.getIsSuccess();
    }

    public static <T> Integer sumInteger(List<T> sourceList, ListGet<T, Integer> get) {
        Integer ret = 0;
        if (sourceList == null) return ret;
        if (get == null) return ret;
        for (T item : sourceList) {
            ret += get.Get(item);
        }
        return ret;
    }

    /**
     * 去重，按照原list的顺序排序，
     *
     * @param sourceList
     * @param listGet    返回去重比较的key
     * @param <T>
     * @param <K>
     * @return
     */
    public static <T, K> List<T> deDuplication(List<T> sourceList, ListGet<T, K> listGet) {
        List<T> retList = new ArrayList<T>();
        Map<K, T> map = new LinkedHashMap<K, T>();
        if (sourceList == null) return retList;
        if (listGet == null) return retList;
        for (T item : sourceList) {
            K key = listGet.Get(item);
            if (!map.containsKey(key)) {
                retList.add(item);
                map.put(key, item);
            }
        }
        return retList;
    }

    public static <T> List<List<T>> getSegmentation(List<T> list, int num) {
        List<List<T>> results = new ArrayList<>();
        if (list == null || list.size() == 0) return results;
        int size = list.size() / num;
        int i = 0;
        while (i < size +1) {
            int start = i * num ;
            int end = (i + 1) * num;
            if (start >= list.size()) {
                start = list.size();
                end = list.size();
            }
            if (start < list.size() && end > list.size()) {
                end = list.size();
            }
            List<T> temp = list.subList(start, end);
            if (temp!=null&&temp.size()>0)
                results.add(temp);
            i++;
        }
        return results;
    }

}


