package com.ty.erp.web.controller;

import com.ty.erp.daos.dao.CartoontypesDao;
import com.ty.erp.entitys.businessmodel.BookSaveModel;
import com.ty.erp.entitys.businessmodel.CallResult;
import com.ty.erp.entitys.businessmodel.FreeModel;
import com.ty.erp.entitys.businessmodel.Role.CostModel;
import com.ty.erp.entitys.entity.Book;
import com.ty.erp.entitys.entity.BookDetail;
import com.ty.erp.entitys.entity.Cartoontypes;
import com.ty.erp.services.businessmodel.PageQueryParameters;
import com.ty.erp.services.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
public class BookController {
    @Autowired
    BookService bookService;
    @Autowired
    CartoontypesDao cartoontypesDao;

    @RequestMapping(value = "Book")
    public String index() {
        return "Book/index";
    }

    @RequestMapping(value = "Book/edit")
    public String edit() {
        return "Book/edit";
    }

    @RequestMapping(value = "Book/partfree")
    public String partfree() {
        return "Book/partfree";
    }


    @RequestMapping(value = "Book/cost")
    public String cost() {
        return "Book/cost";
    }


    @RequestMapping(value = "Book/saveajax", method = RequestMethod.POST)
    @ResponseBody
    public CallResult saveBook(@RequestBody BookSaveModel model) {
        CallResult result = new CallResult();
        bookService.save(model);
        return result;
    }

    @RequestMapping(value = "/Book/getpage", method = RequestMethod.POST)
    @ResponseBody
    public Object getpage(@RequestBody PageQueryParameters parameter) {
        return bookService.getPage(parameter);
    }

    @RequestMapping(value = "/Book/getcount", method = RequestMethod.POST)
    @ResponseBody
    public Object getcount(@RequestBody PageQueryParameters parameter) {
        return bookService.getcount(parameter);
    }


    @RequestMapping(value = "/Book/get", method = RequestMethod.GET)
    @ResponseBody
    public Object get(@RequestParam("RowId") Long RowId) throws Exception {
        Book book = bookService.Get(RowId);
        List<Cartoontypes> types = cartoontypesDao.getList(book.getRowId());
        List<Long> type = new ArrayList<>();
        for (Cartoontypes cartoontypes : types) {
            type.add(cartoontypes.getCartoonTypeRowId());
        }
        book.setTypeRowId(type);
        return book;
    }

    @RequestMapping(value = "bookdetail/addfree", method = RequestMethod.POST)
    @ResponseBody
    public CallResult CartoonDetailSetFree(@RequestBody FreeModel free) {
        CallResult result = new CallResult();
        bookService.setFree(free);
        return result;
    }

    @RequestMapping(value = "Book/getCartoonDetailListByParentId", method = RequestMethod.GET)
    @ResponseBody
    public Object getCartoonDetailListByParentId(@RequestParam("BookRowId") long SellOrderRowId) {
        return bookService.getByBookRowId(SellOrderRowId);
    }

    @RequestMapping(value = "book/adddetail")
    public String addDetail(){
        return "Book/adddetail";
    }
    @RequestMapping(value = "book/adddetail",method = RequestMethod.POST)
    @ResponseBody
    public CallResult addDetail(@RequestBody BookDetail detail){
        CallResult result = new CallResult();
        bookService.saveDetail(detail);
        return result;
    }

    @RequestMapping(value = "bookdetail/saveCost",method = RequestMethod.POST)
    @ResponseBody
    public CallResult saveCost(@RequestBody CostModel cost) {
        CallResult result = new CallResult();
        bookService.saveCost(cost);
        return result;
    }


}
