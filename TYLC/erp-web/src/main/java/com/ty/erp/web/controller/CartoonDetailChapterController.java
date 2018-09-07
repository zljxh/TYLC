package com.ty.erp.web.controller;

import com.ty.erp.daos.dao.CartoonDetailChapterDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CartoonDetailChapterController {
    @Autowired
    CartoonDetailChapterDao cartoonDetailChapterDao;

    @RequestMapping(value = "CartoonDetail/getCartoonDetailListByParentId", method = RequestMethod.GET)
    @ResponseBody
    public Object getCartoonDetailListByParentId(@RequestParam("SellOrderRowId") long SellOrderRowId) {
        return cartoonDetailChapterDao.getByCartoonRowId(SellOrderRowId);
    }
}
