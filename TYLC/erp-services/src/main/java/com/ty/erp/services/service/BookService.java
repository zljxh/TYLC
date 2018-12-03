package com.ty.erp.services.service;

import com.ty.erp.daos.dao.BookDao;
import com.ty.erp.daos.dao.BookDetailDao;
import com.ty.erp.entitys.businessmodel.BookSaveModel;
import com.ty.erp.entitys.businessmodel.FreeModel;
import com.ty.erp.entitys.businessmodel.Role.CostModel;
import com.ty.erp.entitys.entity.Book;
import com.ty.erp.entitys.entity.BookDetail;
import com.ty.erp.services.businessmodel.PageQueryParameters;
import com.ty.erp.utils.util.ListGetTReturn;
import com.ty.erp.utils.util.ListHelp;
import com.ty.erp.utils.util.Snowflake.FactoryIdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author HP
 * @date yyyy/MM/dd
 */
@Service
public class BookService {

    @Autowired
    BookDao dao;
    @Autowired
    TypeService typeService;
    @Autowired
    BookDetailDao bookDetailDao;

    public List getPage(PageQueryParameters parameter) {
        List<Book> list = dao.getList();
        for (Book book : list) {
            Integer sort = bookDetailDao.getLastChapterSort(book.getRowId());
            sort = sort == null ? 0 : sort;
            book.setLastChapterSort(sort);
            book.setType(typeService.getTypeName(book.getRowId()));
        }
        return list;
    }

    public long getcount(PageQueryParameters parameter) {
        return dao.getcount();
    }

    public Book Get(Long rowid) {
        return dao.Get(rowid);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void save(BookSaveModel model) {
        int AllCount = model.getDetailList().size();
        model.getBook().setAllCount(AllCount);
        save(model.getBook());
        saveDetail(model.getDetailList(), model.getBook().getRowId());
        if (model.getDeleteList().size() > 0) {
            bookDetailDao.deleteByRowIds(model.getDeleteList());
        }

    }

    public void save(Book book) {
        if (book.getRowId() == 0) {
            book.setRowId(FactoryIdWorker.NextId());
            book.setCreateDate(new Date());
            typeService.saveTypes(book.getRowId(), book.getTypeRowId());
            dao.Create(book);
        } else {
            dao.Update(book);
            typeService.saveTypes(book.getRowId(), book.getTypeRowId());
        }
    }

    private void saveDetail(List<BookDetail> detailList, long BookRowId) {
        for (BookDetail detail : detailList) {
            if (detail.getRowId() == 0) {
                detail.setRowId(FactoryIdWorker.NextId());
                detail.setBookRowId(BookRowId);
                detail.setEnable(1);
                bookDetailDao.Create(detail);
            } else {
                bookDetailDao.Update(detail);
            }
        }
    }

    public List<BookDetail> getByBookRowId(Long bookRowId) {
        return bookDetailDao.getByBookRowId(bookRowId);
    }

    public void setFree(FreeModel free) {
        if (free.getType() == 1) {
            dao.setAllFree(free.getRowIdList());
        } else {
            dao.setPartFree(free.getRowIdList(), free.getStart());
        }
    }

    public void saveDetail(BookDetail detail) {
        detail.setRowId(FactoryIdWorker.NextId());
        detail.setEnable(1);
        detail.setCreateDate(new Date());
        dao.setAllCount(detail.getBookRowId(), 1);
        bookDetailDao.Create(detail);
    }

    public void saveCost(CostModel cost) {
        bookDetailDao.saveCost(cost.getRowIdList(),cost.getCost());
    }
}
