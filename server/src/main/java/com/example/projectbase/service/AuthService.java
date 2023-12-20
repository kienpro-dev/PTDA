package com.example.projectbase.service;

import com.example.projectbase.domain.dto.AddressDto;
import com.example.projectbase.domain.dto.request.*;
import com.example.projectbase.domain.dto.response.CommonResponseDto;
import com.example.projectbase.domain.dto.response.LoginResponseDto;
import com.example.projectbase.domain.dto.response.TokenRefreshResponseDto;
import com.example.projectbase.domain.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface AuthService {

  LoginResponseDto login(LoginRequestDto request);

  TokenRefreshResponseDto refresh(TokenRefreshRequestDto request);

  CommonResponseDto logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication);

  User register(RegisterRequestDto requestDto, AddressDto addressDto);

  CommonResponseDto forgetPassword(ForgetPasswordRequestDto request);

  CommonResponseDto changePassword(ChangePasswordRequestDto request, String username);
}
