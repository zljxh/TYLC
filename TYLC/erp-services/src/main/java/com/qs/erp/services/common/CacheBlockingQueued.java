package com.qs.erp.services.common;

import com.qs.erp.services.common.cache.SystemCache;
import com.qs.erp.services.common.spring.SpringContextUtil;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Created by xyyz150 on 2015/12/30.
 */
public class CacheBlockingQueued<T> implements java.io.Serializable {
    int takeIndex;
    int putIndex;
    int count;
    int maxSize;
    final ReentrantLock lock;
    private final Condition notEmpty;
    private final Condition notFull;

    //缓存
    String prefix;
    SystemCache cache;

    final int inc(int i) {
        return (++i == maxSize) ? 0 : i;
    }

    final int dec(int i) {
        return ((i == 0) ? maxSize : i) - 1;
    }

    private static void checkNotNull(Object v) {
        if (v == null)
            throw new NullPointerException();
    }

    /**
     * 插入元素
     *
     * @param x
     */
    private void insert(T x) {
        cache.set(prefix + putIndex, x);
        putIndex = inc(putIndex);
        ++count;
        notEmpty.signal();
    }

    /**
     * 获取并移出元素
     *
     * @return
     */
    private T extract() {
        T x = (T) cache.get(prefix + takeIndex);
        cache.delete(prefix + takeIndex);
        takeIndex = inc(takeIndex);
        --count;
        notFull.signal();
        return x;
    }

    public CacheBlockingQueued(String strprefix, int capacity, boolean fair) {
        if (capacity <= 0)
            throw new IllegalArgumentException();
        maxSize = capacity;
        lock = new ReentrantLock(fair);
        notEmpty = lock.newCondition();
        notFull = lock.newCondition();
        prefix = strprefix;
        cache = SpringContextUtil.getBean(SystemCache.class);
    }

    public CacheBlockingQueued(String strprefix, int capacity, boolean fair, SystemCache systemCache) {
        this(strprefix, capacity, fair);
        setCache(systemCache);
    }

    public void setCache(SystemCache systemCache) {
        cache = systemCache;
    }

    /**
     * 插入元素到队尾,调用offer()方法
     *
     * @param e
     * @return
     */
    public boolean add(T e) {
        if (offer(e))
            return true;
        else
            throw new IllegalStateException("Queue full");
    }

    /**
     * 将指定的元素插入到此队列的尾部（不超过该队列的容量立刻执行），
     * 在成功时返回 true，如果此队列已满，则返回 false。
     *
     * @param e
     * @return
     */
    public boolean offer(T e) {
        checkNotNull(e);
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            if (count == maxSize)
                return false;
            else {
                insert(e);
                return true;
            }
        } finally {
            lock.unlock();
        }
    }

    /**
     * 将指定的元素插入此队列的尾部，如果该队列已满，则等待可用的空间。
     *
     * @param e
     * @throws InterruptedException
     */
    public void put(T e) throws InterruptedException {
        checkNotNull(e);
        final ReentrantLock lock = this.lock;
        lock.lockInterruptibly();
        try {
            while (count == maxSize)
                notFull.await();
            insert(e);
        } finally {
            lock.unlock();
        }
    }

    /**
     * 将指定的元素插入此队列的尾部，如果该队列已满，则在到达指定的等待时间之前等待可用的空间。
     *
     * @param e
     * @param timeout
     * @param unit
     * @return
     * @throws InterruptedException
     */
    public boolean offer(T e, long timeout, TimeUnit unit)
            throws InterruptedException {

        checkNotNull(e);
        long nanos = unit.toNanos(timeout);
        final ReentrantLock lock = this.lock;
        lock.lockInterruptibly();
        try {
            while (count == maxSize) {
                if (nanos <= 0)
                    return false;
                nanos = notFull.awaitNanos(nanos);
            }
            insert(e);
            return true;
        } finally {
            lock.unlock();
        }
    }

    /**
     * 获取并移除此队列的头，如果此队列为空，则返回 null。
     *
     * @return
     */
    public T poll() {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            return (count == 0) ? null : extract();
        } finally {
            lock.unlock();
        }
    }

    /**
     * 获取并移除此队列的头部，在队列为空则一直等待
     *
     * @return
     * @throws InterruptedException
     */
    public T take() throws InterruptedException {
        final ReentrantLock lock = this.lock;
        lock.lockInterruptibly();
        try {
            while (count == 0)
                notEmpty.await();
            return extract();
        } finally {
            lock.unlock();
        }
    }

    /**
     * 获取并移除此队列的头部，在队列为空则在指定的时间内等待
     *
     * @param timeout
     * @param unit
     * @return
     * @throws InterruptedException
     */
    public T poll(long timeout, TimeUnit unit) throws InterruptedException {
        long nanos = unit.toNanos(timeout);
        final ReentrantLock lock = this.lock;
        lock.lockInterruptibly();
        try {
            while (count == 0) {
                if (nanos <= 0)
                    return null;
                nanos = notEmpty.awaitNanos(nanos);
            }
            return extract();
        } finally {
            lock.unlock();
        }
    }

    public void clear() {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            for (int i = takeIndex, k = count; k > 0; i = inc(i), k--)
                cache.delete(prefix + i);
            count = 0;
            putIndex = 0;
            takeIndex = 0;
            notFull.signalAll();
        } finally {
            lock.unlock();
        }
    }

    public int size() {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            return count;
        } finally {
            lock.unlock();
        }
    }


}
